import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

const PrivateOutlet = () => {
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem('email');

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/Login')
    }
  }, [isAuthenticated, navigate]);

  return <Outlet />;
};

export default PrivateOutlet;
