import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  if ( isAuthenticated && (location.pathname.includes("/login") || location.pathname.includes("/register")) ) {
    
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }
    // restrict user not to access unauthorized pages based on role
  if (isAuthenticated && user?.role !== 'admin' && location.pathname.includes('/admin')) {
    console.log('heelo' )   
    return <Navigate to="/UnAuth" />;  
  }

  if (isAuthenticated && user?.role === 'admin' && location.pathname.includes('/shop')) {  
     console.log('heelo2' ) 
    return <Navigate to="/admin/dashboard" />;  
  }

  return <>{children}</>

}

export default CheckAuth;
