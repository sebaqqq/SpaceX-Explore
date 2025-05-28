import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, Calendar, Clock, Award } from 'lucide-react';

const HomePage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="py-10 md:py-16">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 inline-block"
        >
          <Rocket className="h-16 w-16 text-space-accent mx-auto" />
        </motion.div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Explora los lanzamientos de 
          <span className="text-space-accent"> SpaceX</span>
        </h1>
        
        <p className="text-xl text-space-gray-300 max-w-3xl mx-auto mb-10">
          Descubre los lanzamientos pasados, futuros y en tiempo real de SpaceX. 
          Información detallada sobre misiones, cohetes y más.
        </p>
      </motion.div>
      
      <motion.div 
        className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Link 
            to="/upcoming" 
            className="card h-full flex flex-col items-center text-center p-8 hover:border-space-accent transition-colors"
          >
            <Calendar className="h-12 w-12 text-space-accent mb-4" />
            <h2 className="text-xl font-bold mb-3">Próximos Lanzamientos</h2>
            <p className="text-space-gray-300 mb-6">
              Explora los próximos lanzamientos programados de SpaceX con detalles de misión y fechas.
            </p>
            <span className="btn-primary mt-auto">Ver Próximos</span>
          </Link>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Link 
            to="/past" 
            className="card h-full flex flex-col items-center text-center p-8 hover:border-space-accent transition-colors"
          >
            <Clock className="h-12 w-12 text-space-accent mb-4" />
            <h2 className="text-xl font-bold mb-3">Lanzamientos Pasados</h2>
            <p className="text-space-gray-300 mb-6">
              Revisa el historial de lanzamientos completados con información sobre éxitos y fracasos.
            </p>
            <span className="btn-primary mt-auto">Ver Historia</span>
          </Link>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Link 
            to="/latest" 
            className="card h-full flex flex-col items-center text-center p-8 hover:border-space-accent transition-colors"
          >
            <Award className="h-12 w-12 text-space-accent mb-4" />
            <h2 className="text-xl font-bold mb-3">Último Lanzamiento</h2>
            <p className="text-space-gray-300 mb-6">
              Detalles completos del lanzamiento más reciente de SpaceX con imágenes y webcast.
            </p>
            <span className="btn-primary mt-auto">Ver Último</span>
          </Link>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="mt-20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <p className="text-space-gray-400 italic">
          "Hacer que la humanidad sea multiplanetaria."
          <span className="block mt-2 text-space-gray-300">- Elon Musk, SpaceX</span>
        </p>
      </motion.div>
    </div>
  );
};

export default HomePage;