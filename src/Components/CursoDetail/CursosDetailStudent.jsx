// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCursoDetail } from "../../Redux/features/courses/coursesSlice";
import { getUserData } from "../../Redux/features/Users/usersSlice";
import Modal from "react-modal";
import ScheduleIcon from "@mui/icons-material/Schedule";

function CursosDetailStudent() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cursoDetail, setCursoDetail] = useState(null);
  const [scheduleModalIsOpen, setScheduleModalIsOpen] = useState(false);

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

  const openScheduleModal = () => setScheduleModalIsOpen(true);
  const closeScheduleModal = () => setScheduleModalIsOpen(false);

  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none",
      background: "#f9fafb",
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "8px",
      outline: "none",
      padding: "20px",
      maxWidth: "600px",
      width: "90%",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

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
            <h1 className="text-3xl font-bold mb-4 text-gray-800">
              {" "}
              {cursoDetail?.name}
            </h1>
            <p className="text-lg text-gray-700">
              {" "}
              <strong>Duración: </strong>
              {cursoDetail?.duracion}
            </p>
            <p className="text-lg text-gray-700">
              {" "}
              <strong>Horas Catedra: </strong>
              {cursoDetail?.horas_catedra}
            </p>
            <p className="text-lg text-gray-700">
              {" "}
              <strong>Costo: </strong>
              {cursoDetail?.costo}
            </p>
            <p className="text-lg text-gray-700">
              {" "}
              <strong>Nivel: </strong>
              {cursoDetail?.nivel}
            </p>
            <div className="text-lg text-gray-700">
              <strong>Horario:</strong>
              <button
                className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded inline-flex items-center"
                onClick={openScheduleModal}
              >
                <ScheduleIcon
                  style={{ fontSize: "20px", marginRight: "4px" }}
                />
                Ver Horario
              </button>
            </div>
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
          <p className="text-lg text-gray-700">
            {" "}
            <strong>Horas Catedra: </strong>
            {cursoDetail?.horas_catedra}
          </p>
          <p className="text-base text-gray-700">
            <strong>Costo: </strong>
            {cursoDetail?.costo}
          </p>
          <p className="text-base text-gray-700">
            <strong>Nivel: </strong>
            {cursoDetail?.nivel}
          </p>
          <div className="text-lg text-gray-700 flex flex-col items-center justify-center">
            <strong>Horario:</strong>
            <button
              className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded inline-flex items-center"
              onClick={openScheduleModal}
            >
              <ScheduleIcon style={{ fontSize: "20px", marginRight: "4px" }} />
              Ver Horario
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Schedule */}
      <Modal
        isOpen={scheduleModalIsOpen}
        onRequestClose={closeScheduleModal}
        style={customStyles}
        contentLabel="Horario del Curso"
      >
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Horario del Curso</h2>
          {cursoDetail?.horario_clases ? (
            <div
              dangerouslySetInnerHTML={{ __html: cursoDetail.horario_clases }}
            />
          ) : (
            <p>Horario no disponible por el momento.</p>
          )}
          <button
            onClick={closeScheduleModal}
            className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Aceptar
          </button>
        </div>
      </Modal>
    </>
  );
}

export default CursosDetailStudent;
