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
    if (storedEmail && !userData) {
      dispatch(getUserData(storedEmail));
    }
  }, [dispatch, storedEmail, userData]);

  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <>
      <div className="hidden sm:block bg-gray-100 p-8 rounded-lg lg:flex">
        <div className="flex items-start ml-8 lg:w-3/4">
          <img
            src={cursoDetail.image || "https://via.placeholder.com/300"}
            alt="Curso"
            className="w-full lg:w-3/5 h-96 object-contain rounded"
          />

          <div className="flex flex-col space-y-4 mt-4 lg:ml-4 lg:mt-0 lg:w-2/5">
            <h1 className="text-2xl font-bold mb-2 text-gray-900">
              {cursoDetail.name}
            </h1>
            <p className="font-gabarito text-gray-900">
              <strong>Duración: </strong>
              {cursoDetail.duracion}
            </p>
            <p className="font-gabarito text-gray-900">
              <strong>Costo: </strong>
              {cursoDetail.costo}
            </p>
            <p className="font-gabarito text-gray-900">
              <strong>Nivel: </strong>
              {cursoDetail.nivel}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-8 text-gray-800 block sm:hidden">
        <div className="flex flex-col items-center">
          <img
            src={cursoDetail.image || "https://via.placeholder.com/300"}
            alt="Curso"
            className="w-full h-auto object-contain rounded-lg mb-4"
          />
          <h1 className="text-xl font-bold mb-2">{cursoDetail.name}</h1>
          <p className="text-base text-gray-700">
            <strong>Duración: </strong>
            {cursoDetail.duracion}
          </p>
          <p className="text-base text-gray-700">
            <strong>Costo: </strong>
            {cursoDetail.costo}
          </p>
          <p className="text-base text-gray-700">
            <strong>Nivel: </strong>
            {cursoDetail.nivel}
          </p>
        </div>
      </div>
    </>
  );
}

export default CursosDetailStudent;
