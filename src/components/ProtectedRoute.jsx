import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute() {
  const { auth } = useAuth();

  return auth ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;