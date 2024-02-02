// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const CrearTaller = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinalizacion, setFechaFinalizacion] = useState("");
  const [duracionHoras, setDuracionHoras] = useState("");
  const [cupoMaximo, setCupoMaximo] = useState("");
  const StoragecursoId = localStorage.getItem("cursoId");

  console.log('Soy cursoId desde crear taller: ', StoragecursoId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newTaller = {
        titulo,
        descripcion,
        fechaInicio,
        fechaFinalizacion,
        duracionHoras: parseInt(duracionHoras),
        cupoMaximo: parseInt(cupoMaximo),
        cursoId: parseInt(StoragecursoId), 
      };

      // Hacer la solicitud POST al servidor para crear un nuevo taller
      const response = await axios.post("/newTaller", newTaller);
      console.log("Taller creado:", response.data);
      toast.success("¡El taller ha sido creado!");
    } catch (error) {
      console.error("Error al crear el taller:", error.response.data);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold mb-6">Crear Nuevo Taller</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label htmlFor="titulo" className="text-lg font-semibold mb-1">
            Título:
          </label>
          <input
            id="titulo"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="border p-3 rounded-md focus:outline-none"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="descripcion" className="text-lg font-semibold mb-1">
            Descripción:
          </label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="border p-3 rounded-md focus:outline-none"
            required
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="fechaInicio" className="text-lg font-semibold mb-1">
            Fecha de Inicio:
          </label>
          <input
            id="fechaInicio"
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="border p-3 rounded-md focus:outline-none"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="fechaInicio" className="text-lg font-semibold mb-1">
            Fecha de Finalización:
          </label>
          <input
            id="fechaInicio"
            type="date"
            value={fechaFinalizacion}
            onChange={(e) => setFechaFinalizacion(e.target.value)}
            className="border p-3 rounded-md focus:outline-none"
            required
          />
        </div>
        <label className="text-lg font-semibold mb-1">Duración en Horas:</label>
        <input
          type="number"
          value={duracionHoras}
          onChange={(e) => setDuracionHoras(e.target.value)}
          className="border p-2 rounded-md w-full"
          required
        />
        <label className="text-lg font-semibold mb-1">Cupo Máximo:</label>
        <input
          type="number"
          value={cupoMaximo}
          onChange={(e) => setCupoMaximo(e.target.value)}
          className="border p-2 rounded-md w-full"
          required
        />
        <input
          type="hidden"
          value={StoragecursoId}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out mt-4"
        >
          Crear Taller
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CrearTaller;