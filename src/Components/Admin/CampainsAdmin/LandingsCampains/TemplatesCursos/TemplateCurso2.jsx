import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCursoDetail } from "../../../../../Redux/features/courses/coursesSlice";
import PropTypes from "prop-types";

export default function TemplateCurso2({ idCurso }) {
  console.log("Este es el id del curso: ", idCurso);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cursoDetail, setCursoDetail] = useState(null);

  useEffect(() => {
    dispatch(fetchCursoDetail(idCurso))
      .then((response) => {
        setCursoDetail(response.payload);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [dispatch, idCurso]);

  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="font-bold text-3xl mb-2">{cursoDetail.name}</h1>
    </div>
  );
}

TemplateCurso2.propTypes = {
  idCurso: PropTypes.string.isRequired,
};