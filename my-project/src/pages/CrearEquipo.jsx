import { useState } from "react";
import { crearEquipo } from '../api/EquipoApi';

const initialState = {
  nombreEquipo: "",
  rif: "",
  directorTecnico: {
    nombre: "",
    cedula: "",
    fechaNacimiento: ""
  },
  jugadores: [
    {
      nombre: "",
      cedula: "",
      fechaNacimiento: ""
    },
    {
      nombre: "",
      cedula: "",
      fechaNacimiento: ""
    },
    {
      nombre: "",
      cedula: "",
      fechaNacimiento: ""
    }
  ]
};



function CrearEquipo() {
  const [equipo, setEquipo] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEquipo({
      ...equipo,
      [name]: value
    });
  };

  const handleDirectorTecnicoChange = (e) => {
    const { name, value } = e.target;
    setEquipo({
      ...equipo,
      directorTecnico: {
        ...equipo.directorTecnico,
        [name]: value
      }
    });
  };

  const handleJugadorChange = (index, e) => {
    const { name, value } = e.target;
    const jugadores = [...equipo.jugadores];
    jugadores[index] = {
      ...jugadores[index],
      [name]: value
    };
    setEquipo({
      ...equipo,
      jugadores: jugadores
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
  
    try {
      const equipoCreado = await crearEquipo(equipo);
      setEquipo(initialState);
      console.log("Equipo creado con éxito:", equipoCreado);
    } catch (error) {
      console.error("Error al crear equipo:", error);
    }
  };

  // const handleClick = (e) => {
  //   e.preventDefault();

  //   fetch(`http://localhost:3000/api/teams`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(equipo),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setEquipo(initialState);
  //       console.log("Equipo creado con éxito");
  //     })
  //     .catch((err) => {
  //       console.log({ err });
  //     });
  // };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-center mb-8">Crea tu equipo</h1>
      <form className="w-80 mx-auto">
        <div className="mb-4">
          <label htmlFor="nombreEquipo" className="block text-gray-700 font-bold mb-2">Nombre del Equipo</label>
          <input
            type="text"
            name="nombreEquipo"
            value={equipo.nombreEquipo}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
            placeholder="Nombre del equipo"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="rif" className="block text-gray-700 font-bold mb-2">RIF</label>
          <input
            type="text"
            name="rif"
            value={equipo.rif}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
            placeholder="RIF"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="directorNombre" className="block text-gray-700 font-bold mb-2">Nombre del Director Técnico</label>
          <input
            type="text"
            name="nombre"
            value={equipo.directorTecnico.nombre}
            onChange={handleDirectorTecnicoChange}
            className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
            placeholder="Nombre del director técnico"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="directorCedula" className="block text-gray-700 font-bold mb-2">Cédula del Director Técnico</label>
          <input
            type="text"
            name="cedula"
            value={equipo.directorTecnico.cedula}
            onChange={handleDirectorTecnicoChange}
            className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
            placeholder="Cédula del director técnico"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="directorFechaNacimiento" className="block text-gray-700 font-bold mb-2">Fecha de Nacimiento del Director Técnico</label>
          <input
            type="date"
            name="fechaNacimiento"
            value={equipo.directorTecnico.fechaNacimiento}
            onChange={handleDirectorTecnicoChange}
            className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Jugadores</label>
          {equipo.jugadores.map((jugador, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Jugador {index + 1}</label>
              <input
                type="text"
                name="nombre"
                value={jugador.nombre}
                onChange={(e) => handleJugadorChange(index, e)}
                className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
                placeholder="Nombre del jugador"
              />
              <input
                type="text"
                name="cedula"
                value={jugador.cedula}
                onChange={(e) => handleJugadorChange(index, e)}
                className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
                placeholder="Cédula del jugador"
              />
              <input
                type="date"
                name="fechaNacimiento"
                value={jugador.fechaNacimiento}
                onChange={(e) => handleJugadorChange(index, e)}
                className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Crear equipo
        </button>
      </form>
    </div>
  );
}

export default CrearEquipo;
