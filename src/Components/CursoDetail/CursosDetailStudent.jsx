// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCursoDetail } from "../../Redux/features/courses/coursesSlice";
import { getUserData } from "../../Redux/features/Users/usersSlice";

function CursosDetailStudent() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cursoDetail, setCursoDetail] = useState(null);

  const userData = useSelector((state) => state.users.userData);
  const storedEmail = localStorage.getItem("email");

  useEffect(() => {
    // Fetch curso detail
    dispatch(fetchCursoDetail(id))
      .then((response) => {
        setCursoDetail(response.payload);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [dispatch, id]);

  useEffect(() => {
    // Fetch user data if stored email exists and user data is not available
    if (storedEmail && !userData) {
      dispatch(getUserData(storedEmail));
    }
  }, [dispatch, storedEmail, userData]);

  // Render loading state
  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

  // Render error state
  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  // Render curso detail
  return (
    <>
      {/* Desktop view */}
      <div className="hidden lg:flex bg-gray-100 p-8 rounded-lg">
        <img
          src={cursoDetail?.image || "https://via.placeholder.com/300"}
          alt="Curso"
          className="w-1/2 h-auto object-contain rounded mr-8"
        />
        <div className="w-1/2">
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-4 text-gray-800"> {/* Aumento de tamaño de la fuente */}
              {cursoDetail?.name}
            </h1>
            <p className="text-lg text-gray-700"> {/* Aumento de tamaño de la fuente */}
              <strong>Duración: </strong>
              {cursoDetail?.duracion}
            </p>
            <p className="text-lg text-gray-700"> {/* Aumento de tamaño de la fuente */}
              <strong>Costo: </strong>
              {cursoDetail?.costo}
            </p>
            <p className="text-lg text-gray-700"> {/* Aumento de tamaño de la fuente */}
              <strong>Nivel: </strong>
              {cursoDetail?.nivel}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile view */}
      <div className="block lg:hidden bg-gray-100 p-8 text-gray-800">
        <img
          src={cursoDetail?.image || "https://via.placeholder.com/300"}
          alt="Curso"
          className="w-full h-auto object-contain rounded-lg mb-4"
        />
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-bold mb-2">{cursoDetail?.name}</h1>
          <p className="text-base text-gray-700">
            <strong>Duración: </strong>
            {cursoDetail?.duracion}
          </p>
          <p className="text-base text-gray-700">
            <strong>Costo: </strong>
            {cursoDetail?.costo}
          </p>
          <p className="text-base text-gray-700">
            <strong>Nivel: </strong>
            {cursoDetail?.nivel}
          </p>
        </div>
      </div>
    </>
  );
}

export default CursosDetailStudent;