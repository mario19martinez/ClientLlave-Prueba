// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AllUserCampain() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const navigate = useNavigate ();

  useEffect(() => {
    // Función para obtener todos los usuarios
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/useriniciado");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    // Llamar a la función para obtener usuarios al cargar el componente
    fetchUsers();
  }, []);

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Formato legible de fecha y hora
  };

  // Función para manejar el cambio en el campo de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="flex justify-start py-3">
        <button
          onClick={() => navigate("/admin/campain")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Atrás
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-4">Usuarios Campañas</h1>
      <div className="overflow-x-auto">
        <input
          type="text"
          placeholder="Buscar usuario..."
          value={searchTerm}
          onChange={handleSearchChange} // Manejar el cambio en el campo de búsqueda
          className="border border-gray-300 rounded-md px-4 py-2 mb-4"
        />
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="px-4 py-2 border border-gray-300">Nombre</th>
              <th className="px-4 py-2 border border-gray-300">Apellido</th>
              <th className="px-4 py-2 border border-gray-300">Email</th>
              <th className="px-4 py-2 border border-gray-300">Teléfono</th>
              <th className="px-4 py-2 border border-gray-300">País</th>
              <th className="px-4 py-2 border border-gray-300">Campaña</th>
              <th className="px-4 py-2 border border-gray-300">Registrado</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) =>
                // Filtrar usuarios según el término de búsqueda
                user.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((user) => (
                <tr key={user.id} className="border-b border-gray-200">
                  <td className="px-4 py-2 border border-gray-300">{user.name}</td>
                  <td className="px-4 py-2 border border-gray-300">{user.last_name}</td>
                  <td className="px-4 py-2 border border-gray-300">{user.email}</td>
                  <td className="px-4 py-2 border border-gray-300">{user.telefono}</td>
                  <td className="px-4 py-2 border border-gray-300">{user.pais}</td>
                  <td className="px-4 py-2 border border-gray-300">{user.campaña}</td>
                  <td className="px-4 py-2 border border-gray-300">{formatDate(user.registeredAt)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
