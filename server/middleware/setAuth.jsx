import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: true,
    isAdmin: "Admin",
    // isAdmin: 'Business',
    // isAdmin: "Capstone",
    user: {
      _id: "66063c6f2c163900f8766a8d", // replace with fake user's _id
      businessId: "660452840ba212fa7ab6971d", // replace with fake user's businessId
      // add other properties as needed
    },
  });

  // authentication logic...
  const login = (token, isAdmin, user) => {
    setAuth({ token, isAdmin, user });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
