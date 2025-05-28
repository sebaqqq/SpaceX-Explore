import { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { ExternalLink, Calendar, Clock, Rocket as RocketIcon, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';
import { Launch } from '../types/Launch';
import { cn } from '../utils/cn';

interface LaunchCardProps {
  launch: Launch;
  isPast?: boolean;
}

const LaunchCard: React.FC<LaunchCardProps> = ({ launch, isPast = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  
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
  
  const getStatusBadge = () => {
    if (!isPast) {
      return (
        <span className="badge-neutral">
          {launch.date_precision === 'hour' ? 'Confirmado' : 'Tentativo'}
        </span>
      );
    }
    
    if (launch.success === true) {
      return <span className="badge-success">Exitoso</span>;
    } else if (launch.success === false) {
      return <span className="badge-error">Fallido</span>;
    } else {
      return <span className="badge-warning">Desconocido</span>;
    }
  };

  return (
    <motion.div
      className="card group h-full"
      whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-display text-lg font-bold text-white group-hover:text-space-accent transition-colors">
            {launch.name}
          </h3>
          {getStatusBadge()}
        </div>
        
        <div className="space-y-3 mb-4 flex-grow">
          <div className="flex items-center text-space-gray-300">
            <Calendar className="h-4 w-4 mr-2 text-space-gray-400" />
            <span className="text-sm">{formatDate(launch.date_utc)}</span>
          </div>
          
          {formatTime(launch.date_utc) && (
            <div className="flex items-center text-space-gray-300">
              <Clock className="h-4 w-4 mr-2 text-space-gray-400" />
              <span className="text-sm">{formatTime(launch.date_utc)} UTC</span>
            </div>
          )}
          
          <div className="flex items-center text-space-gray-300">
            <RocketIcon className="h-4 w-4 mr-2 text-space-gray-400" />
            <span className="text-sm">{launch.rocket || 'Cohete no especificado'}</span>
          </div>
        </div>
        
        <div className={cn(
          "flex items-center justify-end space-x-2 pt-2 border-t border-space-gray-800",
          isHovered ? "opacity-100" : "opacity-60"
        )}>
          {launch.links?.webcast && (
            <a 
              href={launch.links.webcast} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-outline !p-2 !rounded-full"
            >
              <Youtube className="h-4 w-4 text-space-error" />
              <span className="sr-only">Ver webcast</span>
            </a>
          )}
          
          {launch.links?.article && (
            <a 
              href={launch.links.article} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-outline !p-2 !rounded-full"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="sr-only">Leer artículo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default LaunchCard;