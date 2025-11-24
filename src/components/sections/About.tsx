import React, { useEffect, useRef } from 'react';
import Container from '../ui/Container';
import GradientText from '../ui/GradientText';
import { Award, Shield, Zap } from 'lucide-react';

const About: React.FC = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }
    
    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="py-20 md:py-32 relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 to-dark-900 -z-10" />
      <div className="absolute top-1/2 left-1/4 w-1/2 h-1/2 bg-primary-500/20 rounded-full blur-[96px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-accent-500/20 rounded-full blur-[96px] -z-10" />
      
      <Container>
        <div 
          ref={aboutRef} 
          className="max-w-4xl mx-auto opacity-0 translate-y-10 transition-all duration-1000 ease-out"
        >
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/20 mb-8">
              <span className="text-sm font-medium bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                Sobre nós
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
              Somos especialistas em <GradientText>IA aplicada</GradientText> para resultados reais
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              A GmTech Automações é referência em agentes de IA humanizados e soluções de automação sob medida
              para negócios que buscam eficiência operacional, aumento de receita e redução de custos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AboutCard 
              icon={<Shield className="w-12 h-12 text-primary-400" />}
              title="Especialistas em IA"
              description="Equipe com vasta experiência em desenvolvimento e implementação de soluções de inteligência artificial para diversos segmentos."
            />
            <AboutCard 
              icon={<Award className="w-12 h-12 text-accent-400" />}
              title="Reconhecimento no Mercado"
              description="Projetos premiados e cases de sucesso em empresas de diferentes portes, com resultados mensuráveis e significativos."
            />
            <AboutCard 
              icon={<Zap className="w-12 h-12 text-primary-400" />}
              title="Tecnologia de Ponta"
              description="Utilizamos as mais avançadas tecnologias de IA, machine learning e automação para criar soluções personalizadas."
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

type AboutCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const AboutCard: React.FC<AboutCardProps> = ({ icon, title, description }) => {
  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-500/20 to-accent-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative bg-dark-800/50 backdrop-blur-sm border border-dark-700/50 rounded-2xl p-8 hover:border-primary-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10">
        <div className="bg-gradient-to-br from-dark-800 to-dark-900 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-white/70">{description}</p>
      </div>
    </div>
  );
};

export default About;