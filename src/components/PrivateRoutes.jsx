import React, { useContext } from 'react';
import { Route, Outlet, Navigate } from 'react-router-dom';
// import { AuthContext } from '../../server/middleware/setAuth'

function PrivateRoutes({ isAdmin, ...rest }) {
  const { auth } = useContext(AuthContext);

  return auth.token && auth.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/not-authorized" replace />
  );
}

export default PrivateRoutes;
