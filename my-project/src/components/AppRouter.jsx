import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Torneos from '../pages/Torneos';
import CrearEquipo from '../pages/CrearEquipo';
import Navbar from './NavBar';


function AppRouter() {
  return (
    <BrowserRouter>
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/torneos" element={<Torneos />} />
        <Route path="/crear-equipos" element={<CrearEquipo />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;