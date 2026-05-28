#!/usr/bin/env node
// Posta um carousel no Instagram via Meta Graph API
// Uso: node post-carousel.js <carousel-name>
// Exemplo: node post-carousel.js 01-5-leads-perdidos
// Teste de conexão: node post-carousel.js --test

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const GITHUB_BASE = 'https://raw.githubusercontent.com/jguimassai/projetopagina/main/slides';
const API_BASE = 'https://graph.facebook.com/v19.0';
const DELAY_MS = 3000; // aguarda entre criação de containers

function loadEnv() {
  // Em GitHub Actions, usa variáveis de ambiente diretamente
  if (process.env.INSTAGRAM_ACCOUNT_ID) {
    return {
      INSTAGRAM_ACCOUNT_ID: process.env.INSTAGRAM_ACCOUNT_ID,
      META_APP_ID: process.env.META_APP_ID,
      META_ACCESS_TOKEN: process.env.META_ACCESS_TOKEN,
      FACEBOOK_PAGE_ID: process.env.FACEBOOK_PAGE_ID,
    };
  }
  // Localmente, lê do .env
  const envPath = join(__dirname, '.env');
  const lines = readFileSync(envPath, 'utf8').split('\n');
  const env = {};
  for (const line of lines) {
    const [key, ...rest] = line.split('=');
    if (key && rest.length) env[key.trim()] = rest.join('=').trim();
  }
  return env;
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function apiPost(path, params, token) {
  const url = `${API_BASE}${path}`;
  const body = new URLSearchParams({ ...params, access_token: token });
  const res = await fetch(url, { method: 'POST', body });
  const data = await res.json();
  if (data.error) throw new Error(`API error: ${data.error.message} (code ${data.error.code})`);
  return data;
}

async function apiGet(path, params, token) {
  const qs = new URLSearchParams({ ...params, access_token: token });
  const res = await fetch(`${API_BASE}${path}?${qs}`);
  const data = await res.json();
  if (data.error) throw new Error(`API error: ${data.error.message} (code ${data.error.code})`);
  return data;
}

async function testConnection(igAccountId, token) {
  console.log('🔗 Testando conexão com a API...');
  const data = await apiGet(`/${igAccountId}`, { fields: 'username,name' }, token);
  console.log(`✅ Conectado como @${data.username} (${data.name})`);
}

async function createSlideContainer(igAccountId, imageUrl, token) {
  const data = await apiPost(`/${igAccountId}/media`, {
    image_url: imageUrl,
    is_carousel_item: 'true',
  }, token);
  return data.id;
}

async function createCarouselContainer(igAccountId, childrenIds, caption, token) {
  const data = await apiPost(`/${igAccountId}/media`, {
    media_type: 'CAROUSEL',
    caption,
    children: childrenIds.join(','),
  }, token);
  return data.id;
}

async function publishCarousel(igAccountId, creationId, token) {
  const data = await apiPost(`/${igAccountId}/media_publish`, {
    creation_id: creationId,
  }, token);
  return data.id;
}

async function postCarousel(carouselName) {
  const env = loadEnv();
  const { INSTAGRAM_ACCOUNT_ID, META_ACCESS_TOKEN } = env;

  if (!META_ACCESS_TOKEN || META_ACCESS_TOKEN.includes('EAASsIvM9oWcBRj')) {
    console.error('❌ Token expirado ou inválido. Rode: node exchange-token.js');
    process.exit(1);
  }

  const captions = JSON.parse(readFileSync(join(__dirname, 'captions.json'), 'utf8'));
  const schedule = JSON.parse(readFileSync(join(__dirname, 'schedule.json'), 'utf8'));

  const captionData = captions[carouselName];
  if (!captionData) {
    console.error(`❌ Caption não encontrado para: ${carouselName}`);
    process.exit(1);
  }

  const postConfig = schedule.posts.find(p => p.carousel === carouselName);
  const slideCount = postConfig?.slides;
  if (!slideCount) {
    console.error(`❌ Carousel não encontrado no schedule: ${carouselName}`);
    process.exit(1);
  }

  console.log(`\n📸 Iniciando postagem: ${carouselName} (${slideCount} slides)`);
  console.log('─'.repeat(50));

  // Passo 1: criar containers individuais para cada slide
  const childrenIds = [];
  for (let i = 1; i <= slideCount; i++) {
    const slideNum = String(i).padStart(2, '0');
    const imageUrl = `${GITHUB_BASE}/${carouselName}/slide-${slideNum}.png`;
    process.stdout.write(`  Criando container slide ${slideNum}/${slideCount}... `);
    const containerId = await createSlideContainer(INSTAGRAM_ACCOUNT_ID, imageUrl, META_ACCESS_TOKEN);
    childrenIds.push(containerId);
    console.log(`✅ (${containerId})`);
    await sleep(DELAY_MS);
  }

  // Passo 2: criar container do carousel
  console.log('\n  Criando container do carousel...');
  const carouselId = await createCarouselContainer(
    INSTAGRAM_ACCOUNT_ID,
    childrenIds,
    captionData.caption,
    META_ACCESS_TOKEN
  );
  console.log(`✅ Carousel container: ${carouselId}`);
  await sleep(DELAY_MS);

  // Passo 3: publicar
  console.log('\n  Publicando...');
  const mediaId = await publishCarousel(INSTAGRAM_ACCOUNT_ID, carouselId, META_ACCESS_TOKEN);
  console.log(`✅ Publicado! Media ID: ${mediaId}`);

  // Passo 4: postar primeiro comentário com hashtags
  if (captionData.firstComment) {
    console.log('\n  Postando hashtags no primeiro comentário...');
    await sleep(2000);
    await apiPost(`/${mediaId}/comments`, { message: captionData.firstComment }, META_ACCESS_TOKEN);
    console.log('✅ Hashtags postadas!');
  }

  console.log(`\n🎉 ${carouselName} publicado com sucesso!`);
  console.log(`   Acesse: https://www.instagram.com/p/ (pode levar alguns minutos para aparecer)`);
}

async function main() {
  const arg = process.argv[2];

  if (!arg) {
    console.log('Uso: node post-carousel.js <carousel-name>');
    console.log('     node post-carousel.js --test');
    console.log('\nCarousels disponíveis:');
    console.log('  01-5-leads-perdidos');
    console.log('  02-calculadora-leads-perdidos');
    console.log('  03-concorrente-no-box');
    console.log('  04-antes-depois-agenda');
    console.log('  05-resultado-prova');
    console.log('  06-vendedor-23h');
    process.exit(0);
  }

  const env = loadEnv();

  if (arg === '--test') {
    await testConnection(env.INSTAGRAM_ACCOUNT_ID, env.META_ACCESS_TOKEN);
    return;
  }

  await postCarousel(arg);
}

main().catch(err => {
  console.error('\n❌ Erro:', err.message);
  process.exit(1);
});
