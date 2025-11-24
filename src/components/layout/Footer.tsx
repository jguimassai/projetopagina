import React from 'react';
import Container from '../ui/Container';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-950 border-t border-dark-800/50 py-16">
      <Container>
        <div className="text-center">
          <div className="text-2xl font-display font-bold mb-4">
            <GradientText>GmTech</GradientText>
            <span className="ml-1">Automações</span>
          </div>
          <p className="text-white/70 max-w-sm mx-auto">
            Transformando negócios com IA e automação humanizada para resultados reais.
          </p>
        </div>

        <div className="border-t border-dark-800/50 mt-10 pt-10">
          <p className="text-white/50 text-sm text-center">
            © {new Date().getFullYear()} GmTech Automações. Todos os direitos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
};

const GradientText = ({ children, className = '' }) => {
  return (
    <span className={`bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
};

export default Footer;