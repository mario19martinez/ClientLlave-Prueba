// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCursoDetail,
  deleteCurso,
} from "../../../Redux/features/courses/coursesSlice";
import CursoEdit from "./CursoEdit";

function CursoDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const curso = useSelector((state) => state.courses.cursoDetail);
  const loading = useSelector((state) => state.courses.status === "loading");

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleDeletedCurso = () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de eliminar este curso?"
    );
    if (confirmDelete) {
      dispatch(deleteCurso(id))
        .unwrap()
        .then(() => {
          alert("Curso eliminado exitosamente");
          navigate("/admin/cursos");
        })
        .catch((error) => {
          console.error("Error al eliminar el curso:", error);
        });
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openUserAndCursos = () => {
    localStorage.setItem("idCurso", id);
    navigate("/admin/cursos/users-cursos");
  };

  const CursosAndUsers = () => {
    localStorage.setItem("idCurso", id);
    navigate("/admin/cursos/cursos-users");
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchCursoDetail(id));
    }
  }, [dispatch, id]);

  localStorage.setItem("cursoId", id);
  console.log("el cursoId es:", id);

  return (
    <div>
      <Link to="/admin/cursos">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mt-4 ml-8">
          Atrás
        </button>
      </Link>
      <div className="mt-8 p-8 rounded-lg flex items-center h-auto w-4/5">
        {loading ? (
          <div className="text-center mt-8 ml-8">
            <h1 className="text-2xl font-semibold">Cargando...</h1>
          </div>
        ) : (
          <div className="flex items-start ml-8">
            <img
              src={
                curso.image ||
                "https://llaveparalasnaciones.online/wp-content/uploads/2023/08/Blue-White-Minimalist-Technology-Business-Card.png"
              }
              alt="Curso"
              className="w-3/5 h-96 object-contain rounded"
            />

            <div className="flex flex-col ml-8 bg-gray-100 p-4 rounded-lg">
              <h1 className="text-3xl font-bold mb-4 text-gray-900">
                {curso.name}
              </h1>
              <p className="text-lg font-gabarito text-gray-900">
                <strong>Nivel:</strong> {curso.nivel}
              </p>
              <p className="text-lg font-gabarito text-gray-900">
                <strong>Duración:</strong> {curso.duracion}
              </p>
              <p className="text-lg font-gabarito text-gray-900">
                <strong>Costo:</strong> {curso.costo}
              </p>
              <p className="text-lg font-gabarito text-gray-900">
                <strong>Fecha de Inicio:</strong> {curso.fechaInicio}
              </p>

              <div className="flex space-x-4 mt-6">
                <button
                  className="bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                  onClick={openModal}
                >
                  Editar Curso
                </button>

                <button
                  className="bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                  onClick={handleDeletedCurso}
                >
                  Eliminar
                </button>
              </div>

              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300 ease-in-out"
                onClick={openUserAndCursos}
              >
                Agregar Estudiante
              </button>

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300 ease-in-out"
                onClick={CursosAndUsers}
              >
                Ver Estudiantes Inscritos
              </button>
            </div>

            {typeof id === "string" && (
              <CursoEdit id={id} isOpen={modalIsOpen} closeModal={closeModal} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CursoDetail;
