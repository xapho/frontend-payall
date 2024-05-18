

export const crearEquipo = async (datosEquipo) => {
  const respuesta = await fetch('http://localhost:3000/api/teams', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datosEquipo),
  });

  if (!respuesta.ok) {
    throw new Error('Error al crear equipo');
  }

  return await respuesta.json();
};

// export async function crearEquipo(datosEquipo) {
//   const respuesta = await fetch('http://localhost:3000/api/equipos', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(datosEquipo),
//   });

//   if (!respuesta.ok) {
//     throw new Error('Error creando equipo');
//   }

//   return await respuesta.json();
// }