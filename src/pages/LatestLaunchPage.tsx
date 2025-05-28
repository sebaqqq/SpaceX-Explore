import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, Clock, Rocket as RocketIcon, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import YouTube from 'react-youtube';
import PageHeader from '../components/PageHeader';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Launch } from '../types/Launch';
import { fetchLatestLaunch } from '../services/spacexApi';

const LatestLaunchPage = () => {
  const [launch, setLaunch] = useState<Launch | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLaunch = async () => {
      try {
        setIsLoading(true);
        const data = await fetchLatestLaunch();
        setLaunch(data);
        setError(null);
      } catch (err) {
        setError('No se pudo cargar el último lanzamiento. Por favor, inténtalo de nuevo más tarde.');
        console.error('Error fetching latest launch:', err);
      } finally {
        setIsLoading(false);
      }
    };

    getLaunch();
  }, []);

  const formatDate = (date: string) => {
    try {
      return format(new Date(date), 'PPP', { locale: es });
    } catch (error) {
      return 'Fecha desconocida';
    }
  };
  
  const formatTime = (date: string) => {
    try {
      return format(new Date(date), 'HH:mm', { locale: es });
    } catch (error) {
      return '';
    }
  };
  
  const getYouTubeVideoId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  if (isLoading) return <LoadingSpinner message="Cargando el último lanzamiento..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!launch) return <ErrorMessage message="No se encontró información sobre el último lanzamiento." />;

  const videoId = launch.links?.webcast ? getYouTubeVideoId(launch.links.webcast) : null;

  return (
    <div>
      <PageHeader 
        title="Último Lanzamiento" 
        subtitle="Información detallada sobre el lanzamiento más reciente de SpaceX" 
      />
      
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="card overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {videoId && (
            <div className="aspect-w-16 aspect-h-9 mb-6 -mx-6 -mt-6">
              <YouTube
                videoId={videoId}
                className="w-full"
                opts={{
                  width: '100%',
                  height: '100%',
                  playerVars: {
                    autoplay: 0,
                    modestbranding: 1,
                    rel: 0,
                  },
                }}
              />
            </div>
          )}
          
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h1 className="text-2xl md:text-3xl font-bold text-white">{launch.name}</h1>
              <div>
                {launch.success === true ? (
                  <span className="badge-success inline-flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Lanzamiento Exitoso
                  </span>
                ) : launch.success === false ? (
                  <span className="badge-error inline-flex items-center">
                    <XCircle className="h-4 w-4 mr-1" />
                    Lanzamiento Fallido
                  </span>
                ) : (
                  <span className="badge-warning">Estado Desconocido</span>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-space-gray-200">Detalles del Lanzamiento</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-space-gray-300">
                      <Calendar className="h-4 w-4 mr-2 text-space-gray-400" />
                      <span>{formatDate(launch.date_utc)}</span>
                    </div>
                    
                    {formatTime(launch.date_utc) && (
                      <div className="flex items-center text-space-gray-300">
                        <Clock className="h-4 w-4 mr-2 text-space-gray-400" />
                        <span>{formatTime(launch.date_utc)} UTC</span>
                      </div>
                    )}
                    
                    <div className="flex items-center text-space-gray-300">
                      <RocketIcon className="h-4 w-4 mr-2 text-space-gray-400" />
                      <span>{launch.rocket || 'Cohete no especificado'}</span>
                    </div>
                  </div>
                </div>
                
                {launch.details && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-space-gray-200">Descripción</h3>
                    <p className="text-space-gray-300">{launch.details}</p>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-2 text-space-gray-200">Enlaces</h3>
                <div className="grid grid-cols-1 gap-3">
                  {launch.links?.webcast && (
                    <a 
                      href={launch.links.webcast} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-outline flex items-center"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Ver Webcast
                    </a>
                  )}
                  
                  {launch.links?.article && (
                    <a 
                      href={launch.links.article} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-outline flex items-center"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Leer Artículo
                    </a>
                  )}
                  
                  {launch.links?.wikipedia && (
                    <a 
                      href={launch.links.wikipedia} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-outline flex items-center"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Wikipedia
                    </a>
                  )}
                </div>
                
                {launch.links?.patch?.small && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-space-gray-200">Parche de la Misión</h3>
                    <div className="flex justify-center bg-space-gray-800 rounded-lg p-4">
                      <img 
                        src={launch.links.patch.small} 
                        alt={`Parche de la misión ${launch.name}`}
                        className="h-32 w-auto object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LatestLaunchPage;