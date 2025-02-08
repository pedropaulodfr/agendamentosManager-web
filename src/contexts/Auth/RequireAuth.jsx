import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const RequireAuth = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // Redirecionar para a página de login se o usuário não estiver autenticado
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default RequireAuth;