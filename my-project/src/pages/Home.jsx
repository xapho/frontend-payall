import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [torneos, setTorneos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTorneos = async () => {
      try {
        console.log('Fetching torneos...');
        const response = await axios.get('http://localhost:3000/api/torneos');
        console.log('Response:', response.data);
        setTorneos(response.data.torneos); // Ajustar para acceder a la propiedad 'torneos'
        setLoading(false);
      } catch (error) {
        console.error('Error fetching torneos:', error);
        setLoading(false);
      }
    };

    fetchTorneos();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Torneos Disponibles
        </h1>
        <p className="text-gray-600 mt-2">
          Explora y participa en los próximos torneos.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center mt-8">
          <div
            className="spinner-border animate-spin text-gray-800"
            role="status"
          >
            <span className="sr-only">Cargando...</span>
          </div>
        </div>
      ) : Array.isArray(torneos) && torneos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {torneos.map((torneo, index) => (
            <div
              key={index}
              className="card bg-white shadow-md p-4 hover:shadow-lg cursor-pointer"
              // onClick={() => handleTournamentClick(torneo)}
            >
              <div className="card-header">
                <h3 className="card-title text-gray-800">
                  {torneo.nombreTorneo}
                </h3>
              </div>
              <div className="card-body">
                <p className="text-gray-600 mb-2">
                  Lugar: {torneo.lugarTorneo}
                </p>
                <p className="text-gray-600">Equipos Participantes:</p>
                <ul className="list-unstyled">
                  {torneo.equiposParticipantes.map((equipo) => (
                    <li key={equipo.nombreEquipo}>{equipo.nombreEquipo}</li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  // onClick={() => handleTournamentClick(torneo)}
                >
                  Ver
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-600 mt-8">No se encontraron torneos.</div>
      )}
    </div>
  );
};

export default Home;
