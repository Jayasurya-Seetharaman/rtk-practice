import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthVM } from '../../viewmodels/useAuthVM';

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuthVM();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};