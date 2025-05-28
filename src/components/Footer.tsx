import { Link } from 'react-router-dom';
import { Rocket, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-space-gray-800 bg-space-navy/80 backdrop-blur-md py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Rocket className="h-5 w-5 text-space-accent" />
            <span className="font-display font-bold text-white">SpaceX Explorer</span>
          </div>
          
          <nav className="flex flex-wrap justify-center space-x-6 mb-4 md:mb-0">
            <Link to="/" className="text-sm text-space-gray-300 hover:text-space-accent">
              Inicio
            </Link>
            <Link to="/upcoming" className="text-sm text-space-gray-300 hover:text-space-accent">
              Próximos Lanzamientos
            </Link>
            <Link to="/past" className="text-sm text-space-gray-300 hover:text-space-accent">
              Lanzamientos Pasados
            </Link>
            <Link to="/latest" className="text-sm text-space-gray-300 hover:text-space-accent">
              Último Lanzamiento
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <a href="https://github.com/sebaqqq" className="text-space-gray-300 hover:text-space-accent" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://twitter.com/spacex" className="text-space-gray-300 hover:text-space-accent" target="_blank" rel="noopener noreferrer">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="https://linkedin.com/company/spacex" className="text-space-gray-300 hover:text-space-accent" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
        
        <div className="mt-8 border-t border-space-gray-800 pt-6 text-center text-sm text-space-gray-400">
          <p>© {new Date().getFullYear()} SpaceX Explorer. Esta es una aplicación no oficial creada con fines educativos.</p>
          <p className="mt-2">
            Datos proporcionados por la <a href="https://github.com/r-spacex/SpaceX-API" className="text-space-accent hover:underline" target="_blank" rel="noopener noreferrer">API pública de SpaceX</a>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;