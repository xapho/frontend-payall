import React, { useState, useEffect } from "react";
import axios from "axios";

const initialState = {
  nombreTorneo: "",
  fechaInicio: "",
  fechaFin: "",
  lugarTorneo: "",
  equiposParticipantes: [], 
  partidos: [], 
};

function Torneos() {
  const [torneo, setTorneo] = useState(initialState);
  const [equipos, setEquipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectCount, setSelectCount] = useState(1); 

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/teams");
        if (Array.isArray(response.data)) {
          setEquipos(response.data); 
        } else {
          setEquipos([]);
          console.warn("Unexpected response structure:", response.data); // 
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching equipos:", error);
        setEquipos([]);
        setLoading(false);
      }
    };

    fetchEquipos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTorneo({
      ...torneo,
      [name]: value,
    });
  };

  const handleEquiposChange = (e, index) => {
    const { value } = e.target;
    const newEquipos = [...torneo.equiposParticipantes];
    newEquipos[index] = value; 

    setTorneo({
      ...torneo,
      equiposParticipantes: newEquipos,
    });

    
    e.target.blur();
  };

  const handleAddSelect = () => {
    setSelectCount(selectCount + 1);
    setTorneo({
      ...torneo,
      equiposParticipantes: [...torneo.equiposParticipantes, ""], 
    });
  };

  const handleRemoveSelect = (index) => {
    const newEquipos = [...torneo.equiposParticipantes];
    newEquipos.splice(index, 1); 

    setTorneo({
      ...torneo,
      equiposParticipantes: newEquipos,
    });

    setSelectCount(selectCount - 1);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const torneoCreado = await axios.post(
        "http://localhost:3000/api/torneos",
        torneo
      );
      setTorneo(initialState);
      setSelectCount(1); // devuelve el contador a estado inicial
      console.log("Torneo creado con éxito:", torneoCreado);
    } catch (error) {
      console.error("Error al crear torneo:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-center mb-8">Crear Torneo</h1>
      <form className="w-80 mx-auto">
        <div className="mb-4">
          <label
            htmlFor="nombreTorneo"
            className="block text-gray-700 font-bold mb-2"
          >
            Nombre del Torneo
          </label>
          <input
            type="text"
            name="nombreTorneo"
            value={torneo.nombreTorneo}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
            placeholder="Nombre del torneo"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="fechaInicio"
            className="block text-gray-700 font-bold mb-2"
          >
            Fecha de Inicio
          </label>
          <input
            type="date"
            name="fechaInicio"
            value={torneo.fechaInicio}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="fechaFin"
            className="block text-gray-700 font-bold mb-2"
          >
            Fecha de Fin
          </label>
          <input
            type="date"
            name="fechaFin"
            value={torneo.fechaFin}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="lugarTorneo"
            className="block text-gray-700 font-bold mb-2"
          >
            Lugar del Torneo
          </label>
          <input
            type="text"
            name="lugarTorneo"
            value={torneo.lugarTorneo}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
            placeholder="Lugar del torneo"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="equiposParticipantes"
            className="block text-gray-700 font-bold mb-2"
          >
            Equipos Participantes
          </label>
          {Array.from({ length: selectCount }).map((_, index) => (
            <div key={index} className="flex items-center mb-2">
              <select
                name="equiposParticipantes"
                value={torneo.equiposParticipantes[index] || ""}
                onChange={(e) => handleEquiposChange(e, index)}
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
              >
                <option value="" disabled>
                  Seleccionar equipo
                </option>
                {loading ? (
                  <option>Cargando equipos...</option>
                ) : (
                  equipos &&
                  equipos.map((equipo) => (
                    <option key={equipo._id} value={equipo._id}>
                      {equipo.nombreEquipo}
                    </option>
                  ))
                )}
              </select>
              <button
                type="button"
                onClick={handleAddSelect}
                className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              >
                +
              </button>
              {selectCount > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveSelect(index)}
                  className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  -
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={handleClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Crear torneo
        </button>
      </form>
    </div>
  );
}

export default Torneos;