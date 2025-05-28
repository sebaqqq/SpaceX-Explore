import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <AlertTriangle className="h-12 w-12 text-space-error" />
      <h3 className="mt-4 text-xl font-semibold text-white">Error al cargar los datos</h3>
      <p className="mt-2 text-space-gray-300 max-w-md">{message}</p>
    </div>
  );
};

export default ErrorMessage;