// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCursoDetail } from "../../Redux/features/courses/coursesSlice";
import { getUserData } from "../../Redux/features/Users/usersSlice";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

function CursoDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Utiliza useSelector para acceder al estado y las acciones asincrónicas
  const cursoDetail = useSelector((state) => state.courses.cursoDetail);
  const status = useSelector((state) => state.courses.status);
  const error = useSelector((state) => state.courses.error);

  const userData = useSelector((state) => state.users.userData);
  const storedEmail = localStorage.getItem("email");

  useEffect(() => {
    // Dispatch de la acción para obtener los detalles del curso
    dispatch(fetchCursoDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (storedEmail) {
      dispatch(getUserData(storedEmail));
    }
  }, [dispatch, storedEmail]);

  console.log(userData);

  return (
    <>
      {/* Elemento para pantallas medianas y grandes */}
      <div className="hidden sm:block bg-gray-100 p-8 rounded-lg lg:flex">
        {status === "loading" ? (
          <div className="text-center">
            <h1 className="text-xl font-semibold">Cargando...</h1>
          </div>
        ) : status === "failed" ? (
          <div className="text-center text-red-500">Error: {error}</div>
        ) : (
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
                <strong>Duracion: </strong>
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
              <button
                onClick={() =>
                  (window.location.href = "https://wa.me/+573126096603")
                }
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
              >
                <WhatsAppIcon className="mr-2" />
                Mas información
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Elemento para pantallas pequeñas (móviles) */}
      <div className="bg-gray-100 p-8 text-gray-800 block sm:hidden">
        {status === "loading" ? (
          <div className="text-center">
            <h1 className="text-lg font-semibold">Cargando...</h1>
          </div>
        ) : status === "failed" ? (
          <div className="text-center text-red-500">Error: {error}</div>
        ) : (
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
            {/*<button
              onClick={handleRegistrarseClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Registrarse al curso
            </button>*/}
          </div>
        )}
      </div>
    </>
  );
}

export default CursoDetail;
