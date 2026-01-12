import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth no debe ser usado por fuera de AuthProvider');
  }

  return {
    isAuthenticated: context.isAuthenticated,
    singin: context.singin,
    singout: context.singout,
    // alias por compatibilidad
    signout: context.singout,
    role: context.role,
    username: context.username,
  };

};

export default useAuth;
