import { useState, useEffect } from "react";
import RequestAmigo from "./RequestAmigo";
import { useDispatch } from "react-redux";
//import AmigoRequestResponse from "./AmigoRequestResponse";
import { getUserData } from "../../../Redux/features/Users/usersSlice";
import { Link } from 'react-router-dom'
import axios from "axios";

function AgregarAmigo() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [currentUserSub, setCurrentUserSub] = useState(""); // Sub del usuario actual
  const [pendingFriendRequests, setPendingFriendRequests] = useState([]);
  
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");

    if (storedEmail) {
      dispatch(getUserData(storedEmail)).then((response) => {
        setCurrentUserSub(response.payload);
      });
    }
    loadUsers();
    loadPendingFriendRequests();
  }, [searchName, currentUserSub.sub]); // Agregamos searchName como dependencia para que se ejecute cuando cambie

  const loadUsers = async () => {
    try {
      const response = await axios.get(`/buscar-amigos/${currentUserSub.sub}`, {
        params: {
          name: searchName,
        }
      });
      console.log('response', response)

      setUsers(response.data);
    } catch (error) {
      console.error("Error al mapear la data:", error);
    }
  };

  const sendFriendRequest = async (amigoId) => {
    try {
      const token = localStorage.getItem("token");
      console.log('Token:', token)
      if (!token) {
        console.error("Token no encontrado en el almacenamiento local.");
        return;
      }

      await axios.post(
        `send-request/${amigoId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Puedes realizar acciones adicionales despues de enviar la solicitud si es necesario.
      console.log("Solicitud de amistad enviada con exito.");
    } catch (error) {
      console.error("Error sending friend request:", error);
      // Añadir mas informacion sobre el error si esta disponible
      if (error.response) {
        console.error("Respuesta del servidor:", error.response.data);
      }
    }
  };

  const loadPendingFriendRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token no encontrado en el alamcenamiento local.");
        return;
      }
      const response = await axios.get("/pending-friend-requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingFriendRequests(response.data);
    } catch (error) {
      console.error(
        "Error al cargar las solicitudes de amistad pendientes:",
        error
      );
    }
  };

  const respondFriendRequest = async (requestId, response) => {
    try {
      const token = localStorage.getItem('token')
      if(!token) {
        console.error('Token no esta en local:', token)
        return;
      }

      await axios.put(`/accept-request/${requestId}`, { response }, {
        headers: { Authorization: `Bearer ${token}`},
      });
      loadPendingFriendRequests();
      console.log('Amigo aceptado con exito.')
    } catch (error) {
      console.error('Error al aceptar la solicitu de amistad:', error);
    }
  }

  return (
    <div className="p-4 bg-blue-400">
      <div>
        <Link to='/Comunidad' className="bg-white px-4 py-2 rounded shadow-md hover:shadow-lg focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out">Atras</Link>
      </div>
      <div className="flex items-center mb-4 translate-y-4">
        {currentUserSub.image && (
          <img
          src={currentUserSub.image}
          alt="Profile"
          className="w-10 h-10 rounded-full mr-2" 
          />
        )}
        <div className="text-lg font-semibold">
        {currentUserSub.name + " " + currentUserSub.last_name}</div>
        </div>
      <div>
      <h1 className="text-2xl font-bold mb-4 text-gray-800 translate-y-2">Lista de usuarios</h1>
      <input
        type="text"
        placeholder="Buscar Amigo"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        className="p-2 border-gray-300 rounded-md mb-4"
      />
      <ul className="bg-gray-100 p-4">
        {users.map((user) => (
          <li
            key={user.sub}
            className="mb-4 p-2 border border-gray-300 rounded-md flex items-center justify-between"
          >
            {user.name + " " + user.last_name}
            <RequestAmigo amigoId={user.sub} onSendRequest={(amigoId) => sendFriendRequest(amigoId)} />
          </li>
        ))}
      </ul>
      </div>
      <div>
      {/* Renderizar solicitudes de amistad pendientes */}
      <h1 className="text-2xl font-bold mb-4">
        Solicitudes de amistad pendientes
      </h1>
      <ul className="bg-gray-200 p-4">
        {pendingFriendRequests.length === 0 ? (
          <li className="mb-4 p-2 border border-gray-300 rounded-md">
            No hay solicitudes de amistad pendientes
          </li>
        ) : (
          pendingFriendRequests.map((request) => (
            <li
              key={request.id}
              className="mb-4 p-2 border border-gray-300 rounded-md flex items-center justify-between"
            >
              {request.sender.name} te ha enviado una solicitud de amistad
              <div>
                <button
                onClick={() => respondFriendRequest(request.id, 'accept')}
                className="bg-green-500 text-white px-2 py-1 rounded-md mr-2"
                >Aceptar
                </button>
                <button
                onClick={() => respondFriendRequest(request.id, 'reject')}
                className="bg-red-500 text-white px-2 py-1 rounded-md"
                >Rechazar</button>
              </div>
            </li>
          ))
        )}
      </ul>
      </div>
    </div>
  );
}

export default AgregarAmigo;
