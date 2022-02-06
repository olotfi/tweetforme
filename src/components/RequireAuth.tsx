import React from 'react';
import { useCurrentUser } from '../context/auth';
import { Navigate } from 'react-router-dom';

export type RequireAuthProps = {
  children: React.ReactNode;
};

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const { currentUser } = useCurrentUser();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
