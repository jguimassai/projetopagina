import React, { useEffect, useRef } from 'react';
import Container from '../ui/Container';
import GradientText from '../ui/GradientText';
import { Search, FileText, Cpu, RefreshCw, ArrowRight, Target, Lightbulb, Rocket, Gauge } from 'lucide-react';

const Methodology: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="methodology" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 to-dark-950 -z-10" />
      <div className="absolute top-1/2 left-1/4 w-1/2 h-1/2 bg-primary-500/20 rounded-full blur-[96px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-accent-500/20 rounded-full blur-[96px] -z-10" />
      
      <Container>
        <div 
          ref={sectionRef} 
          className="opacity-0 translate-y-10 transition-all duration-1000 ease-out"
        >
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/20 mb-8">
              <span className="text-sm font-medium bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                Nossa Metodologia
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
              Metodologia <GradientText>GmTech</GradientText> — o Caminho para Resultados
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Nossa abordagem proprietária combina diagnóstico profundo, planejamento estratégico 
              e implementação gradual para transformar seu negócio com IA.
            </p>
          </div>
          
          <div className="mt-16 relative">
            <div className="max-w-5xl mx-auto">
              {/* Steps grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <MethodologyStep
                  number="01"
                  icon={<Target className="w-8 h-8" />}
                  title="Diagnóstico Profundo"
                  description="Análise completa dos processos, dores e oportunidades do seu negócio."
                  features={[
                    "Mapeamento de processos",
                    "Análise de eficiência",
                    "Identificação de gargalos"
                  ]}
                />
                
                <MethodologyStep
                  number="02"
                  icon={<Lightbulb className="w-8 h-8" />}
                  title="Planejamento Estratégico"
                  description="Identificação dos fluxos que podem ser otimizados com IA e automação."
                  features={[
                    "Definição de objetivos",
                    "Roadmap de implementação",
                    "KPIs de sucesso"
                  ]}
                />
                
                <MethodologyStep
                  number="03"
                  icon={<Rocket className="w-8 h-8" />}
                  title="Implementação Ágil"
                  description="Desenvolvimento e integração dos agentes de IA sob medida."
                  features={[
                    "Sprints focados",
                    "Testes contínuos",
                    "Feedback em tempo real"
                  ]}
                />
                
                <MethodologyStep
                  number="04"
                  icon={<Gauge className="w-8 h-8" />}
                  title="Otimização Contínua"
                  description="Análise de resultados e refinamento constante para maior eficiência."
                  features={[
                    "Monitoramento 24/7",
                    "Ajustes baseados em dados",
                    "Evolução constante"
                  ]}
                />
              </div>
            </div>
            
            <div className="text-center mt-16">
              <a 
                href="#apply" 
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-dark-800/50 border border-dark-700/50 hover:border-primary-500/30 transition-all duration-300"
              >
                <span className="text-white/90 group-hover:text-white transition-colors">
                  Conheça mais sobre nossa metodologia
                </span>
                <ArrowRight className="w-4 h-4 text-primary-400 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

type MethodologyStepProps = {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
};

const MethodologyStep: React.FC<MethodologyStepProps> = ({ number, icon, title, description, features }) => {
  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-500/20 to-accent-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700/50 hover:border-primary-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10">
        {/* Step number */}
        <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-sm font-bold">
          {number}
        </div>
        
        {/* Icon */}
        <div className="bg-gradient-to-br from-primary-500/20 to-accent-500/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <div className="text-primary-400 group-hover:text-accent-400 transition-colors">
            {icon}
          </div>
        </div>
        
        {/* Content */}
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-white/70 mb-6">{description}</p>
        
        {/* Features */}
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-white/60">
              <div className="w-1.5 h-1.5 rounded-full bg-primary-400" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Methodology;