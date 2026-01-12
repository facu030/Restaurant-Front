import { Navigate } from 'react-router-dom';
import useAuth from '../hook/useAuth';

function ProtectedRoute({ children, requiredRole = null }) {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default ProtectedRoute;
