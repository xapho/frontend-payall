import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">GOAT TeamStats</Link>
        <ul className="flex space-x-4">
          <li><Link to="/" className="text-white hover:text-gray-300">Inicio</Link></li>
          <li><Link to="/torneos" className="text-white hover:text-gray-300">Torneos</Link></li>
          <li><Link to="/crear-equipos" className="text-white hover:text-gray-300">Crear Equipo</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;