

export const buscarTorneo = async (datosTorneo) => {
  const respuesta = await fetch('http://localhost:3000/api/torneos', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify(datosTorneo),
     body: JSON.stringify(datosTorneo) 
  });

  if (!respuesta.ok) {
    throw new Error('Error al encontrar torneos');
  }

  return await respuesta.json();
};

export const crearTorneo = async (datosTorneo) => {
  const respuesta = await fetch('http://localhost:3000/api/torneos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datosTorneo),
  });

  if (!respuesta.ok) {
    throw new Error('Error al crear torneo');
  }

  return await respuesta.json();
};