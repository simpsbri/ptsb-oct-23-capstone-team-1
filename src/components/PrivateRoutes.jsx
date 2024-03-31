import React, { useContext } from 'react'
import { Route, Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from '../../server/middleware/setAuth'

function PrivateRoutes({ element, ...rest }) {
  const { auth } = useContext(AuthContext)

  return auth.token ? <Outlet /> : <Navigate to='/not-authorized' />
}

export default PrivateRoutes
