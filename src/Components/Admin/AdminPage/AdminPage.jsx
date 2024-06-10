// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MdStar,
  MdSupervisorAccount,
  MdLibraryBooks,
  MdPeople,
  MdRecordVoiceOver,
  MdVideoLibrary,
} from "react-icons/md";

export default function AdminPage() {
  const navigate = useNavigate();

  // Función para manejar la navegación con menos repetición de código
  const handleNavigate = (path) => () => {
    navigate(path);
  };

  return (
    <div className="py-10 px-32 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Funcionalidades y elementos de la página principal
      </h1>
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Secciones a editar</h2>
        <div className="flex flex-col gap-6">
          <button
            onClick={handleNavigate("/admin/Egresados")}
            className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white py-3 px-5 rounded-lg shadow-lg transition duration-300 ease-in-out"
          >
            <MdSupervisorAccount className="mr-2" /> Egresados
          </button>
          <button
            onClick={handleNavigate("/admin/profetico/")}
            className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white py-3 px-5 rounded-lg shadow-lg transition duration-300 ease-in-out"
          >
            <MdLibraryBooks className="mr-2" /> Entrenando tus sentidos espirituales
          </button>
          <button
            onClick={handleNavigate("/admin/informacion")}
            className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-5 rounded-lg shadow-lg transition duration-300 ease-in-out"
          >
            <MdStar className="mr-2" /> Entrenamiento Profético
          </button>
          <button
            onClick={handleNavigate("/admin/blogs")}
            className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white py-3 px-5 rounded-lg shadow-lg transition duration-300 ease-in-out"
          >
            <MdLibraryBooks className="mr-2" /> Blogs
          </button>
          <button
            onClick={handleNavigate("/Admin/Nosotros")}
            className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-5 rounded-lg shadow-lg transition duration-300 ease-in-out"
          >
            <MdPeople className="mr-2" /> Nosotros
          </button>
          <button
            onClick={handleNavigate("/admin/testimonios")}
            className="flex items-center justify-center bg-purple-500 hover:bg-purple-600 text-white py-3 px-5 rounded-lg shadow-lg transition duration-300 ease-in-out"
          >
            <MdRecordVoiceOver className="mr-2" /> Testimonios
          </button>
          <button
            onClick={handleNavigate("/admin/transmisiones")}
            className="flex items-center justify-center bg-teal-500 hover:bg-teal-600 text-white py-3 px-5 rounded-lg shadow-lg transition duration-300 ease-in-out"
          >
            <MdVideoLibrary className="mr-2" /> Transmisiones
          </button>
        </div>
      </div>
    </div>
  );
}