import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Spin } from "antd";
import { useEffect } from 'react';

export default function NoMatch() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000); 
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-2xl'><span className='text-appColor font-extrabold'>404</span> - Page is not found</h1>
      <p>
      The page you are looking for does not exist. You are directed to the home page...
      </p>
      <div><Spin/></div>
    </div>
  );
};

