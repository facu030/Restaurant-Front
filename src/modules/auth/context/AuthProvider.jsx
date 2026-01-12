import { createContext, useState } from 'react';
import { login } from '../services/login';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('token');
    return Boolean(token);
  });

  const [role, setRole] = useState(() => {
    return localStorage.getItem('role') ?? null;
  });

  const [username, setUsername] = useState(() => {
    return localStorage.getItem('username') ?? null;
  });

  const singout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    //temporal hasta implementar refresh token
    setIsAuthenticated(false);
    setRole(null);
    setUsername(null);
  };

  const singin = async (usernameInput, password) => {
    const { data, error } = await login(usernameInput, password);

    if (error) {
      return { error };
    }

    // data: { token, role, username }
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);
    localStorage.setItem('username', data.username);
    setIsAuthenticated(true);
    setRole(data.role);
    setUsername(data.username);

    return { error: null };
  };

  return (
    <AuthContext.Provider
      value={ {
        isAuthenticated,
        singin,
        singout,
        role,
        username,
      } }
    >
      {children}
    </AuthContext.Provider>
  );
};

export {
  AuthProvider,
  AuthContext,
};
