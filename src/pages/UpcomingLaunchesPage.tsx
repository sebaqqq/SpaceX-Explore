import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import LaunchCard from '../components/LaunchCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Launch } from '../types/Launch';
import { fetchUpcomingLaunches } from '../services/spacexApi';

const UpcomingLaunchesPage = () => {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLaunches = async () => {
      try {
        setIsLoading(true);
        const data = await fetchUpcomingLaunches();
        setLaunches(data);
        setError(null);
      } catch (err) {
        setError('No se pudieron cargar los próximos lanzamientos. Por favor, inténtalo de nuevo más tarde.');
        console.error('Error fetching upcoming launches:', err);
      } finally {
        setIsLoading(false);
      }
    };

    getLaunches();
  }, []);

  // Animation variants for grid
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (isLoading) return <LoadingSpinner message="Cargando próximos lanzamientos..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <PageHeader 
        title="Próximos Lanzamientos" 
        subtitle="Descubre los próximos lanzamientos programados de SpaceX" 
      />
      
      {launches.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-space-gray-300">No hay próximos lanzamientos programados en este momento.</p>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {launches.map((launch) => (
            <LaunchCard key={launch.id} launch={launch} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default UpcomingLaunchesPage;