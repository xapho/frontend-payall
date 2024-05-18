export const crearPartido = async (datosPartido) => {
  const respuesta = await fetch('http://localhost:3000/api/partidos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datosPartido),
  });

  if (!respuesta.ok) {
    throw new Error('Error al crear el partido');
  }

  return await respuesta.json();
};