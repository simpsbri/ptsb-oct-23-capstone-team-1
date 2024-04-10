import React, { createContext, useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    isAdmin: null,
    user: null,
  });

  const [isLoading, setIsLoading] = useState(true);

  // authentication logic...
  const login = (token, isAdmin, user) => {
    setAuth({ token, isAdmin, user });
    setIsLoading(false);
  };

  // Simulate fetching auth state from an API
  useEffect(() => {
    const fetchAuthState = async () => {
      // Fetch auth state from API...
      // For now, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      login('fake-token', true, 'fake-user');
    };

    fetchAuthState();
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ auth, login }}>
      {children}
    </AuthContext.Provider>
  );
};
