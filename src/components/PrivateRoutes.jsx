import React, { useContext } from 'react';
import { Route, Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../../server/middleware/setAuth';

const PrivateRoutes = ({ isAdmin }) => {
  const { auth } = useContext(AuthContext);

  return auth.user.isAdmin === isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/not-authorized" replace />
  );
};

export default PrivateRoutes;
