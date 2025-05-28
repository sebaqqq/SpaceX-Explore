import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Rocket, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const navItems = [
    { path: '/', label: 'Inicio' },
    { path: '/upcoming', label: 'Próximos Lanzamientos' },
    { path: '/past', label: 'Lanzamientos Pasados' },
    { path: '/latest', label: 'Último Lanzamiento' },
  ];
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-space-gray-800 bg-space-navy/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2"
            onClick={closeMenu}
          >
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Rocket className="h-6 w-6 text-space-accent" />
            </motion.div>
            <span className="font-display text-xl font-bold text-white">SpaceX Explorer</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-space-accent ${
                  isActive(item.path) 
                    ? 'text-space-accent border-b-2 border-space-accent pb-1' 
                    : 'text-space-gray-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={toggleMenu}
            className="inline-flex items-center justify-center rounded-md p-2 text-space-gray-300 hover:bg-space-navy hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-space-accent md:hidden"
          >
            <span className="sr-only">Abrir menú</span>
            {isMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div 
          className="md:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                  isActive(item.path)
                    ? 'bg-space-blue text-space-accent'
                    : 'text-space-gray-300 hover:bg-space-navy hover:text-white'
                }`}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;