import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCursos } from "../../../Redux/features/courses/coursesSlice";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function CursosCertificar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cursos = useSelector((state) => state.courses.cursos);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(cursos.length / itemsPerPage);

  useEffect(() => {
    dispatch(getCursos())
      .then((response) => {
        console.log("Cursos obtenidos:", response.payload);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [dispatch]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <p className="text-center text-lg font-semibold mb-4">Cargando ...</p>
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Box className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <Typography variant="h6" className="text-red-500">
          Error al cargar cursos: {error}
        </Typography>
      </Box>
    );
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCursos = cursos.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Lista de Cursos para certificar
      </h2>
      <div className="grid grid-cols-2 gap-6">
        {currentCursos.map((curso) => (
          <div
            key={curso.id}
            onClick={() => navigate(`/Admin/Certificado/Curso/${curso.id}`)}
            className="p-4 border rounded-lg shadow-sm transition-transform transform hover:-translate-y-1 hover:shadow-md cursor-pointer bg-gradient-to-r from-green-100 to-blue-100"
          >
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium text-gray-900">{curso.name}</p>
              <svg
                className="w-5 h-5 text-gray-400 transition-transform transform hover:scale-125"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center space-x-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}