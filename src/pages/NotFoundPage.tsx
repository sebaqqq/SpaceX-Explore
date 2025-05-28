import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Rocket className="h-24 w-24 text-space-accent" />
      </motion.div>
      
      <motion.h1
        className="mt-8 text-4xl font-bold text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        404 - Página no encontrada
      </motion.h1>
      
      <motion.p
        className="mt-4 text-space-gray-300 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Parece que esta misión se ha desviado de su trayectoria. 
        La página que estás buscando no se encuentra en nuestra órbita.
      </motion.p>
      
      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Link to="/" className="btn-primary">
          Volver a la Tierra
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;