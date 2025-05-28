import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import LaunchCard from '../components/LaunchCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Launch } from '../types/Launch';
import { fetchPastLaunches } from '../services/spacexApi';

const PastLaunchesPage = () => {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 12;

  useEffect(() => {
    const getLaunches = async () => {
      try {
        setIsLoading(true);
        const data = await fetchPastLaunches(page, itemsPerPage);
        
        if (data.length < itemsPerPage) {
          setHasMore(false);
        }
        
        if (page === 1) {
          setLaunches(data);
        } else {
          setLaunches(prev => [...prev, ...data]);
        }
        
        setError(null);
      } catch (err) {
        setError('No se pudieron cargar los lanzamientos pasados. Por favor, inténtalo de nuevo más tarde.');
        console.error('Error fetching past launches:', err);
      } finally {
        setIsLoading(false);
      }
    };

    getLaunches();
  }, [page]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

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

  if (isLoading && page === 1) return <LoadingSpinner message="Cargando lanzamientos pasados..." />;
  if (error && launches.length === 0) return <ErrorMessage message={error} />;

  return (
    <div>
      <PageHeader 
        title="Lanzamientos Pasados" 
        subtitle="Explora el historial de lanzamientos completados de SpaceX" 
      />
      
      {launches.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-space-gray-300">No se encontraron lanzamientos pasados.</p>
        </div>
      ) : (
        <>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {launches.map((launch) => (
              <LaunchCard key={launch.id} launch={launch} isPast={true} />
            ))}
          </motion.div>
          
          {(hasMore || isLoading) && (
            <div className="mt-10 text-center">
              <button 
                onClick={loadMore} 
                className="btn-secondary"
                disabled={isLoading}
              >
                {isLoading ? 'Cargando...' : 'Cargar Más'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PastLaunchesPage;