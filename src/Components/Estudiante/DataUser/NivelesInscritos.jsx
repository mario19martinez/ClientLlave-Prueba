// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from '../../../Redux/features/Users/usersSlice';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function NivelesInscritos() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.userData);
  const storedEmail = localStorage.getItem("email");
  const [nivelesInscritos, setNivelesInscritos] = useState([]);

  useEffect(() => {
    if (storedEmail) {
      dispatch(getUserData(storedEmail));
    }
  }, [dispatch, storedEmail]);

  useEffect(() => {
    if (userData && userData.sub) {
      const fetchNivelesInscritos = async () => {
        try {
          const response = await axios.get(`/niveles/${userData.sub}`);
          setNivelesInscritos(response.data);
        } catch (error) {
          console.error('Error al obtener los niveles inscritos del usuario:', error);
        }
      };

      fetchNivelesInscritos();
    }
  }, [userData]);

  return (
    <div className="px-4 md:px-20 lg:px-40">
      <div className="mb-8 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Niveles Inscritos</h2>
      </div>

      <div className="font-normal text-center md:text-left">
        {nivelesInscritos.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {nivelesInscritos.map((nivel, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
                <img className="w-full h-40 object-cover" src={nivel.image} alt={nivel.name} />
                <div className="flex flex-col justify-between h-64 p-4">
                  <div>
                    <p className="text-lg font-semibold mb-2">{nivel.name}</p>
                    <p className="text-gray-500 mb-2">{nivel.description}</p>
                  </div>
                  {/* Enlace al detalle del nivel con su respectivo id */}
                  <Link to={`/estudiante/NivelesDetails/${nivel.id}`}>
                    <button
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Ver nivel
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No hay niveles inscritos</p>
        )}
      </div>
    </div>
  );
}