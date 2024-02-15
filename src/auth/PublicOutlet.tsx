import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

const PublicOutlet = () => {
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem('email');

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate('/Books')
    }
  }, [isAuthenticated, navigate]);

  return <Outlet />;
};

export default PublicOutlet;
