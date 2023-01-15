import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


import { Home }  from './home';


export const Main = () => {

  const navigate = useNavigate();

  useEffect(() => {
    // Assuming user is logged in 
      navigate('/home');
  }, [navigate]);

  return (
    <Routes>
      <Route path="/home" element={<Home/>}/>     
    </Routes>
  );
};
