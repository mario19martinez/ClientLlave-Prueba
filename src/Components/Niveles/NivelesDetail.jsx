// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ModulosNivel from "../ModulosNivel/ModulosNivel";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Nav from "../Nav/Nav";

function NivelesDetail() {
  const [nivel, setNivel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [userSub, setUserSub] = useState(null);
  const [userActivityInfo, setUserActivityInfo] = useState(null);
  // const [inicio, setInicio] = useState(null); // Agregamos estado para 'inicio'
  // const [fin, setFin] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/usuario/sub", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserSub(response.data.userSub);
        if (id && response.data.userSub) {
          const inicio = new Date(); // Establecer 'inicio'
          setUserActivityInfo({
            userSub: response.data.userSub,
            nivelId: id,
            inicio: inicio, // Asignar 'inicio' al objeto userActivityInfo
          });
        }
        console.log("response:", response);
      } catch (error) {
        console.error("Error al obtener el sub del usuario:", error);
      }
    };
  
    fetchUserData();
  }, [id]);

  useEffect(() => {
    const handleUnmount = () => {
      const fin = new Date(); // Establecer 'fin' al desmontar el componente
      setUserActivityInfo((prevInfo) => ({
        ...prevInfo,
        fin: fin, // Asignar 'fin' al objeto userActivityInfo
      }));
    };
  
    return handleUnmount; // Establecer 'fin' cuando el componente se desmonte
  }, []);

  useEffect(() => {
    const fetchNivel = async () => {
      try {
        if (!id) {
          setLoading(false);
          return;
        }
        const response = await axios.get(`/nivel/${id}`);
        setNivel(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los datos del nivel:", error);
        setLoading(false);
      }
    };
    fetchNivel();
  }, [id]);

  // Este useEffect es el que va a enviar los datos del usuario a la db
  // useEffect(() => {
  //   const token = localStorage.getItem('token')
  //   if (userActivityInfo) {
  //     axios
  //       .post("/movimiento-usuario", userActivityInfo, {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       })
  //       .then((response) => {
  //         console.log(
  //           "Informacion del usuario enviada con exito:",
  //           response.data
  //         );
  //       })
  //       .catch((error) => {
  //         console.error("Error al enviar la informacion del usuario:", error);
  //       });
  //   }
  // }, [userActivityInfo]);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (!nivel) {
    return <NotFoundScreen />;
  }

  return (
    <div>
      <Nav />
      <div className="container mx-auto p-8">
        <div className="px-5 py-5">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-8">{nivel.name}</h2>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center md:gap-16">
            <div className="w-full md:w-1/2">
              <img
                src={nivel.image}
                alt="Imagen del nivel"
                className="mx-auto mb-8 rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full px-3 md:w-1/2">
              <p className="text-lg font-semibold">Descripción:</p>
              {showFullDescription ? (
                <p className="text-lg mb-2">{nivel.description}</p>
              ) : (
                <p className="text-lg mb-2">
                  {nivel.description.slice(0, 150)}
                  {nivel.description.length > 150 && (
                    <span>
                      ...{" "}
                      <button
                        className="text-blue-500"
                        onClick={toggleDescription}
                      >
                        Ver más
                      </button>
                    </span>
                  )}
                </p>
              )}
              <p className="text-lg font-semibold">Duración:</p>
              <p className="text-lg mb-2">{nivel.duracion}</p>
              <p className="text-lg font-semibold">Costo:</p>
              <p className="text-lg mb-2">{nivel.costo}</p>
              <div className="pb-4">
                <button className="w-full flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-400 text-white font-semibold rounded-lg focus:outline-none focus:shadow-outline-blue">
                  <WhatsAppIcon className="mr-2" />
                  Contacto Administración
                </button>
              </div>
            </div>
          </div>
        </div>
        <ModulosNivel nivelId={nivel.id} />
      </div>
    </div>
  );
}

const LoadingScreen = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-xl font-semibold">Cargando...</p>
    </div>
  );
};

const NotFoundScreen = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-xl font-semibold">No se encontró el nivel.</p>
    </div>
  );
};

export default NivelesDetail;
