import React, { useState, useEffect, createContext, useContext } from 'react';
import { auth } from '../lib/firebase';

export interface User {
  uid: string;
  email: string;
  name: string | null;
  roles: string[];
}

interface AuthContextValue {
  currentUser: User | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue>({ currentUser: null, isLoading: false });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const { claims } = await auth.currentUser!.getIdTokenResult();
        if (!claims!.roles) {
          auth.signOut();
          console.log('User does not have roles.');
          return;
        } else {
          const currentUser = {
            uid: user.uid,
            email: user.email!,
            name: user.displayName,
            roles: claims.roles as string[]
          };
          setCurrentUser(currentUser);
        }
      } else {
        setCurrentUser(null);
      }
      setIsLoading(false);
    });
  }, []);

  return <AuthContext.Provider value={{ currentUser, isLoading }}>{children}</AuthContext.Provider>;
};

export const useCurrentUser = () => useContext(AuthContext);
