import axios from "axios";
import { useState, useEffect, useMemo, useRef } from "react";
import io from "socket.io-client";

function Message() {
  const [mensaje, setMensaje] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [userSelected, setUserSelected] = useState(null);
  const [mensajesPorUsuario, setMensajePorUsuario] = useState({});
  const [chatsRecientes, setChatsRecientes] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState({});
  const socket = io("http://localhost:3001", { transports: ["websocket"] });

  const messageContainerRef = useRef(null)

  // Obtener la informacion del usuario al cargar el componente
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("user-info", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error al obtener información del usuario:", error);
      }
    };
    getUserInfo();
  }, []);

  // Obtener los usuarios con historial de chat al cargar el componente
  useEffect(() => {
    const getChatUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/chat-historial", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const chatUsers = response.data.map((usuario) => ({
          ...usuario,
          fullName: `${usuario.name} ${usuario.last_name}`,
        }));
        setUltimosChats(chatUsers);
      } catch (error) {
        console.error("Error al obtener usuarios con chat:", error);
        console.error("Error response data:", error.response.data);
      }
    };

    getChatUsers();
  }, []);

  // Obtener la lista de usuarios al cargar el componente
  useEffect(() => {
    const getUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const responseGet = await axios.get("/users-chat", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const usuarioConLastName = responseGet.data.map((usuario) => ({
          ...usuario,
          fullName: `${usuario.name} ${usuario.last_name}`,
        }));
        setUsuarios(usuarioConLastName);
      } catch (error) {
        console.error("Error al obtener la lista de usuarios:", error);
      }
    };
    getUsers();
  }, []);

  // Cargar mensajes al seleccionar un usuario
  const cargarMensajes = async () => {
    try {
      if (!userInfo || !userSelected || !userSelected.sub) {
        console.warn(
          "La informacion del usuario o el usuario seleccionado no esta definida."
        );
        return;
      }
      const token = localStorage.getItem("token");
      const response = await axios.get(`/chat-users/${userSelected.sub}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const mensajes = response.data.map((mensaje) => ({
        ...mensaje,
        messageType: mensaje.senderId === userInfo.sub ? "sent" : "received",
      }));
  
      setMensajePorUsuario((prevMensajes) => ({
        ...prevMensajes,
        [userSelected.sub]: mensajes,
      }));
    } catch (error) {
      console.error("Error al obtener mensajes entre usuarios:", error);
    }
  };

  // Iniciar un Chat con un usuario
  const iniciarChat = async (usuario) => {
    setUserSelected(usuario);
  
    const existeChat = chatsRecientes.some((chat) => chat.sub === usuario.sub);
  
    if (!existeChat) {
      setChatsRecientes((prevChats) => [usuario, ...prevChats]);
    } else {
      // Si el chat ya existe, asegúrate de que esté al principio de la lista
      setChatsRecientes((prevChats) => [
        usuario,
        ...prevChats.filter((chat) => chat.sub !== usuario.sub),
      ]);
    }
  
    // Utiliza setUserSelected de manera asíncrona
    setUserSelected((prevUserSelected) => {
      // Verificar que userSelected y userSelected.sub estén definidos
      if (!userInfo || !usuario || !usuario.sub) {
        console.warn("La información del usuario o el usuario seleccionado no está definida.");
        return prevUserSelected;
      }
  
      // Cargar mensajes después de actualizar userSelected
      cargarMensajes();
      
      // Devolver el nuevo estado de userSelected
      return usuario;
    });
  };

  const [ultimosChats, setUltimosChats] = useState([]);
  const latestUltimosChats = useRef(ultimosChats);

  // Ordenar los ultimos chats por el tiempo del ultimo mensaje
  const ultimosChatsOrdenados = useMemo(() => {
    return [...latestUltimosChats.current].sort((a, b) => {
      const subA = a?.sub || "";
      const subB = b?.sub || "";
  
      const ultimoMensajeA = mensajesPorUsuario[subA]?.[0]?.timestamp || 0;
      const ultimoMensajeB = mensajesPorUsuario[subB]?.[0]?.timestamp || 0;
  
      return ultimoMensajeB - ultimoMensajeA;
    });
  }, [mensajesPorUsuario]);

  // Actualizar los ultimos chats cuando cambia el orden
  useEffect(() => {
    if (latestUltimosChats.current !== ultimosChatsOrdenados) {
      latestUltimosChats.current = ultimosChatsOrdenados;
      setUltimosChats(ultimosChatsOrdenados);
    }
  }, [ultimosChatsOrdenados]);

  // Solicita permisos de notificaciones al cargar el componente
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }

    // Manejar eventos del socket
    socket.on("nuevo-mensaje", (nuevoMensaje) => {
      const usuarioId = userSelected ? userSelected.sub : null;

      if (nuevoMensaje.from === userInfo.sub) {
        return;
      }

      setMensajePorUsuario((prevMensajes) => {
        const mensajesPorUsuario = prevMensajes[usuarioId] || [];
        return {
          ...prevMensajes,
          [usuarioId]: [...mensajesPorUsuario, nuevoMensaje],
        };
      });

      if (usuarioId !== nuevoMensaje.from && !document.hasFocus()) {
        setUnreadMessages((prevUnreadMessages) => {
          const unreadCount = prevUnreadMessages[usuarioId] || 0;
          return {
            ...prevUnreadMessages,
            [usuarioId]: unreadCount + 1,
          };
        });
      }

      if (Notification.permission === "granted" && !document.hasFocus()) {
        new Notification("Nuevo mensaje", {
          body: nuevoMensaje.content,
        });
      }
    });

    socket.on("usuarios-conectados", (usuariosConectados) => {
      setUsuarios(usuariosConectados);
    });

    socket.on("chat-iniciado", (data) => {
      console.log("Chat iniciado:", data);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket, mensajesPorUsuario, userSelected]);

  // Enviar un mensaje
  const enviarMensaje = async () => {
    if (!userInfo || !userSelected) {
      console.warn(
        "La información del usuario o el usuario seleccionado no está definida. enviarMensaje"
      );
      return;
    }

    const usuarioId = userSelected.sub;
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/start-chat",
        {
          receiverId: userSelected.sub,
          content: mensaje,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMensajePorUsuario((prevMensajes) => {
        const mensajesPorUsuario = prevMensajes[usuarioId] || [];
        return {
          ...prevMensajes,
          [usuarioId]: [
            ...mensajesPorUsuario,
            { content: mensaje, from: userInfo.sub, sentBy: "sent" },
          ],
        };
      });
      setMensaje("");

      await cargarMensajes();

      // Desplazar hacia abajo para mostrar el nuevo mensaje
      if (messageContainerRef.current) {
        messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
      }
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }

    if (Notification.permission === "granted" && !document.hasFocus()) {
      new Notification("Nuevo mensaje", {
        body: mensaje,
      });
    }
  };

  // Cargar mensajes al seleccionar un usuario
  useEffect(() => {
    if (userSelected) {
      cargarMensajes();
    }
  }, [userSelected]);

  // Obtener el historial de mensajes desde localStorage al cargar el componente
  useEffect(() => {
    const storedMessages = localStorage.getItem("chatHistory");
    if (storedMessages) {
      const parsedMessages = JSON.parse(storedMessages);
      setMensajePorUsuario(parsedMessages);
    }
  }, []);

  // Guardar el historial de mensajes en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(mensajesPorUsuario));
  }, [mensajesPorUsuario]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [mensajesPorUsuario]);

  return (
    <div className="flex h-screen">
      <div className="w-72 bg-blue-600 p-4">
        <h2 className="text-lg font-semibold mb-4 text-white">
          Usuarios en línea
        </h2>
        <div className="max-h-auto overflow-y-auto">
          <ul>
            {usuarios.map((usuario) => (
              <li
                key={usuario.id || usuario.sub}
                className="mb-2 flex items-center justify-between"
              >
                <span className="mr-2 text-white text-normal font-semibold">
                  {usuario.fullName}
                </span>
                <button
                  onClick={() => iniciarChat(usuario)}
                  className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-lg ml-auto"
                >
                  Iniciar Chat
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-1 p-4">
        <div className="mb-4 flex flex-col overflow-hidden">
          <div className="bg-gray-100 p-2">
            {userInfo && (
              <p className="text-lg font-semibold">
                Usuario: {userInfo.name} ({userInfo.email})
              </p>
            )}
            {userSelected ? (
              <p className="text-lg font-semibold">
                Chat con: {userSelected.name}
              </p>
            ) : (
              <p className="text-lg font-semibold">Chats Recientes</p>
            )}
          </div>
          <div className="flex-1 overflow-y-auto max-h-96"
          ref={messageContainerRef}
          >
            {!userSelected && (
              <ul>
                {ultimosChats
                  .filter((chat) => chat.sub !== userInfo.sub)
                  .map((chat) => (
                    <li
                      key={chat.sub}
                      className={unreadMessages[chat.sub] ? "bg-red-200" : ""}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="mr-2 text-black text-normal font-semibold">
                          {chat.fullName}
                        </span>
                        <button
                          onClick={() => iniciarChat(chat)}
                          className="bg-blue-500 hover.bg-blue-700 text-white p-2 rounded-lg ml-auto"
                        >
                          Iniciar Chat
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
            {userSelected &&
              userSelected.sub &&
              mensajesPorUsuario[userSelected.sub] &&
              mensajesPorUsuario[userSelected.sub]
                .slice(0)
                .reverse()
                .map((mensaje, index) => (
                  <div
                    key={index}
                    className={`flex items-start mb-4 ${
                      mensaje.messageType === "sent"
                        ? "justify-end self-end"
                        : "justify-start self-start"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg max-w-md ${
                        mensaje.messageType === "sent"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300"
                      }`}
                    >
                      {mensaje.content}
                    </div>
                  </div>
                ))}
          </div>
        </div>
        <div className="flex-1 overflow-auto bg-gray-100 p-4"></div>
        <div className="mt-4 flex flex-col fixed bottom-0 left-0 w-full">
          <div className="flex translate-x-80 -translate-y-2">
            <input
              type="text"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              className="w-2/3 p-2 border-2 border-blue-500 rounded"
            />
            <button
              onClick={enviarMensaje}
              className="p-2 ml-2 bg-blue-500 text-white rounded"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
