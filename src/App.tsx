import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { AuthProvider, useCurrentUser } from './context/auth';
import { LoadingScreen } from './components/LoadingScreen';
import { RequireAuth } from './components/RequireAuth';
import { NotAuthorised } from './pages/NotAuthorised/NotAuthorised';

export type RootProviderProps = { children: React.ReactNode };
export const RootProvider = ({ children }: RootProviderProps) => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export const App = () => {
  const { isLoading: isAuthLoading } = useCurrentUser();

  if (isAuthLoading) return <LoadingScreen />;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/not-authorised" element={<NotAuthorised />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
