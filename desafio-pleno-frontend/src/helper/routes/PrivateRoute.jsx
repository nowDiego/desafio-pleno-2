import React from 'react';
import { Navigate } from 'react-router-dom';


function PrivateRoute({ children}) {

  let token = localStorage.getItem('_token');
 
  return token !== null ? children : 
  <Navigate to="/login" />;
}


export default PrivateRoute;
