// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCursoDetail } from "../../Redux/features/courses/coursesSlice";
import { getUserData } from "../../Redux/features/Users/usersSlice";
//import WhatsAppIcon from "@mui/icons-material/WhatsApp";
//import EventIcon from "@mui/icons-material/Event";

function CursoDetail() {
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
      <div className="bg-gray-100 p-8 text-gray-800 block">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-3xl mb-2">{cursoDetail.name}</h1>
        </div>
      </div>
  );
}

export default CursoDetail;