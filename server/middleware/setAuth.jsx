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
    // Save to local storage
    localStorage.setItem('auth', JSON.stringify({ token, isAdmin, user }));
  };

  useEffect(() => {
    const fetchAuthState = async () => {
      // Fetch auth state from API...
      // For now, we'll just simulate a delay
      // await new Promise((resolve) => setTimeout(resolve, 2000))

      // Retrieve auth state from local storage
      const storedAuth = localStorage.getItem('auth');
      if (storedAuth) {
        const { token, isAdmin, user } = JSON.parse(storedAuth);
        login(token, isAdmin, user);
      } else {
        login('fake-token', true, 'fake-user');
      }
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

  const logout = () => {
    // Clear the auth state
    setAuth({
      token: null,
      isAdmin: null,
      user: null,
    });

    // Clear the auth data from local storage
    localStorage.removeItem('auth');
  };

  // Pass the logout function to the context provider

  return (
    <AuthContext.Provider value={{ auth, login }}>
      {children}
    </AuthContext.Provider>
  );
};
