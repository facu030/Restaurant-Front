import { createContext, useState, useCallback } from 'react';
import authService from '../services/authService';
import { getErrorMessage } from '../helpers/backendError';

const AuthContext = createContext(null);

const getInitialAuthState = () => ({
  token: localStorage.getItem('token') || null,
  role: localStorage.getItem('role') || null,
  username: localStorage.getItem('username') || null,
});

function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(getInitialAuthState);

  // Guarda en localStorage Y en el estado de React 
  const persistAuth = useCallback(({ token, user }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', user.role);
    localStorage.setItem('username', user.userName);

    setAuthState({
      token,
      role: user.role,
      username: user.userName,
    });
  }, []);

  const signin = useCallback(async (username, password) => {
  try {
    const data = await authService.login(username, password);
    persistAuth(data);
    return { error: null, role: data.user.role };
  } catch (err) {
    return { error: getErrorMessage(err), role: null }; 
  }
}, [persistAuth]);

  const signup = useCallback(async (username, email, password, phone = '') => {
  try {
    const data = await authService.register(username, email, password, phone);
    persistAuth(data);
    return { error: null, role: data.user.role };
  } catch (err) {
    return { error: getErrorMessage(err), role: null }; 
  }
}, [persistAuth]);

  const signout = useCallback((redirectTo = '/') => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    setAuthState({ token: null, role: null, username: null });
    window.location.href = redirectTo;
  }, []);

  const value = {
    isAuthenticated: Boolean(authState.token),
    role: authState.role,
    username: authState.username,
    signin,
    signup,
    signout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
