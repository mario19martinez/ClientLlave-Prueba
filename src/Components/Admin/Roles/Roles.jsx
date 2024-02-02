import { useState, useEffect } from "react";
import axios from "axios";

function Roles() {
  const [usuarios, setUsuarios] = useState([]);

  // Llamada al backend para obtener la lista de usuarios y roles
  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await axios.get("/usuarios");
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };
    obtenerUsuarios();
  }, []); // Vacio para que se ejecute una sola vez al montar el componente

  const cambiarRol = async (sub, nuevoRol) => {
    try {
      await axios.put(`/rol/${sub}`, { newRole: nuevoRol });
      // Actualizar el estado de los usuarios despues de cambiar el rol
      setUsuarios((prevUsuarios) => {
        return prevUsuarios.map((usuario) => {
          if (usuario.sub === sub) {
            return { ...usuario, rol: nuevoRol };
          }
          return usuario;
        });
      });
    } catch (error) {
      console.log("Error al cambiar el rol del usuario:", error);
    }
  };

  return (
    <div className="absolute top-0 left-0 mt-28 ml-96 p-4">
      <h1 className="text-2xl font-gabarito mb-4 text-gray-700">Roles de Usuarios</h1>
      <div className="overflow-x-auto">
      <table className="min-w-full border-collapse- border bg-blue-600">
        <thead className="">
          <tr className="text-white">
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Nombre</th>
            <th className="py-2 px-4 border">Apellido</th>
            <th className="py-2 px-4 border">Rol</th>
            <th className="py-2 px-4 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario, index) => (
            <tr key={usuario.sub} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
              <td className="py-2 px-4 border">{usuario.sub}</td>
              <td className="py-2 px-4 border">{usuario.name}</td>
              <td className="py-2 px-4 border">{usuario.last_name}</td>
              <td className="py-2 px-4 border">{usuario.rol}</td>
              <td className="py-2 px-4 border">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-2 py-1 rounded mr-2"
                  onClick={() => cambiarRol(usuario.sub, "admin")}
                >
                  Asignar Admin
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-2 py-1 rounded mr-2"
                  onClick={() => cambiarRol(usuario.sub, "docente")}
                >
                  Asignar Docente
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-2 py-1 rounded mr-2"
                  onClick={() => cambiarRol(usuario.sub, "client")}
                >
                  Asignar Cliente
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Roles;
