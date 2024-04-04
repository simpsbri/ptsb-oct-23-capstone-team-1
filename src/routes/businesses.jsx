import React from 'react';
import BusinessList from '../components/BusinessList/BusinessList';
import { AuthContext } from '../../server/middleware/setAuth';

const Businesses = () => {
  const { auth } = React.useContext(AuthContext);
  return (
    <div>
      {auth.isAdmin ? (
        <BusinessList />
      ) : (
        <p>You are not authorized to view this page.</p>
      )}
    </div>
  );
};

export default Businesses;
