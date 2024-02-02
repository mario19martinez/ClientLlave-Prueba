// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCursoDetail } from "../../Redux/features/courses/coursesSlice";
import { getUserData } from "../../Redux/features/Users/usersSlice";
//import { addStudentToCourse } from "../../Redux/features/UsersCourses/UsersCursesSlices";

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

  /*const handleRegistrarseClick = async () => {
    try {
      console.log("Intentando registrarse al curso...");
      console.log("userData:", userData);

      console.log('Id de usuario: ',userData.sub, 'Id de curso: ',id)
      localStorage.setItem("IdCurso", id);

      if (userData && userData.sub) {
        const response = await dispatch(
          addStudentToCourse({ userId: userData.sub, cursoId: id })
        );
        console.log("Estudiante agregado con éxito al curso", response.payload);
        alert('Curso ', cursoDetail.name, ' agregado con exito ', userData.name)
      } else {
        console.log("Datos de usuario no válidos");
      }
    } catch (error) {
      console.error("Error al agregar estudiante al curso:", error);
    }
  };*/

  return (
    <div className="">
      <div className="mt-4 p-8 rounded-lg bg-gray-300 lg:flex">
        {status === "loading" ? (
          <div className="text-center mt-8 ml-8">
            <h1 className="text-xl font-semibold">Cargando...</h1>
          </div>
        ) : status === "failed" ? (
          <div className="text-center text-red-500 mt-8">Error: {error}</div>
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
              <p className="font-gabarito text-gray-900">
                <strong>Descripcion: </strong>
                {cursoDetail.descripcion}
              </p>
              <p className="font-gabarito text-gray-900">
                <strong>Fecha de Inicio: </strong>
                {cursoDetail.fechaInicio}
              </p>
              {/*<button
                onClick={handleRegistrarseClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Registrarse al curso
        </button>*/}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CursoDetail;
