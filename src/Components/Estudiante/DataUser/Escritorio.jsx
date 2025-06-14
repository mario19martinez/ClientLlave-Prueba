import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchInscripcion } from "../../../Redux/features/UsersCourses/UsersCursesSlices";
import { fetchCursoDetail } from "../../../Redux/features/courses/coursesSlice";
import { getUserData } from "../../../Redux/features/Users/usersSlice";
import CircularProgress from "@mui/material/CircularProgress";
import {
  ImportContacts as ImportContactsIcon,
  EmojiEvents as EmojiEventsIcon,
  LiveTv as LiveTvIcon,
  People as PeopleIcon,
} from "@mui/icons-material";

function Escritorio() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.userData);
  const navigate = useNavigate();
  const storedEmail = localStorage.getItem("email");

  const [cursoCount, setCursoCount] = useState(0);
  const [certificados, setCertificados] = useState(0);
  const [transmisiones, setTransmisiones] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (storedEmail) {
      dispatch(getUserData(storedEmail));
    }
  }, [dispatch, storedEmail]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userData?.sub) return;

        setLoading(true);
        setError(null);

        const [cursoCount, certificadosCount, transmisionesCount] = await Promise.all([
          fetchCursoNivelDiplomaturas(userData.sub),
          fetchCertificados(userData.sub),
          fetchTransmisiones(),
        ]);

        setCursoCount(cursoCount);
        setCertificados(certificadosCount);
        setTransmisiones(transmisionesCount);
      } catch (err) {
        setError("Error al obtener datos del escritorio.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, userData]);

  const fetchCursoNivelDiplomaturas = async (userId) => {
    let total = 0;

    // Cursos
    const inscripcionResponse = await dispatch(fetchInscripcion(userId));
    const inscripciones = inscripcionResponse?.payload?.inscripciones || [];
    if (inscripciones.length > 0) total += inscripciones.length;

    // Niveles
    const nivelesResponse = await axios.get(`/user/${userId}/grupos-nivel`).catch(() => ({ data: { grupos: [] } }));
    const niveles = nivelesResponse.data.grupos || [];
    if (niveles.length > 0) total += niveles.length;

    // Diplomaturas
    const diplomaturasResponse = await axios.get(`/diplomaturas/${userId}/mis-diplomaturas`).catch(() => ({ data: [] }));
    const diplomaturas = diplomaturasResponse.data || [];
    if (diplomaturas.length > 0) total += diplomaturas.length;

    return total;
  };

  const fetchCertificados = async (userId) => {
    const [curso, nivel, modulo] = await Promise.all([
      axios.get(`/certificadosCurso/usuario/${userId}`).catch(() => ({ data: [] })),
      axios.get(`/certificados/${userId}`).catch(() => ({ data: [] })),
      axios.get(`/certificadosModulo/usuario/${userId}`).catch(() => ({ data: [] })),
    ]);
    return (curso.data.length || 0) + (nivel.data.length || 0) + (modulo.data.length || 0);
  };

  const fetchTransmisiones = async () => {
    const res = await axios.get("/transmisiones").catch(() => ({ data: [] }));
    return res.data.length || 0;
  };

  const Card = ({ icon, title, count, subtitle, onClick }) => (
    <div
      onClick={onClick}
      className="bg-white hover:bg-blue-50 border border-blue-200 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 cursor-pointer w-64 h-48 flex flex-col items-center justify-center text-center mx-3 my-4 p-4"
    >
      <div className="bg-blue-100 rounded-full p-3 mb-2 text-blue-600">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-3xl font-bold text-blue-600">{count}</p>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );

  const cursosInscritosRedirect = () => {
    navigate("/estudiante/cursosInscritos");
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="text-center">
          <p className="text-gray-600 mt-4 font-semibold">Cargando Escritorio...</p>
          <CircularProgress />
        </div>
      </div>
    );
  }

  return (
    <div className="sm:px-4 lg:px-20 py-10 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Bienvenido a tu Escritorio</h2>
      <div className="flex flex-wrap justify-center gap-6">
        <Card
          icon={<ImportContactsIcon fontSize="large" />}
          title="Mis Cursos"
          count={cursoCount}
          subtitle="Cursos, niveles y diplomaturas"
          onClick={cursosInscritosRedirect}
        />
        <Card
          icon={<EmojiEventsIcon fontSize="large" />}
          title="Certificados"
          count={certificados}
          subtitle="Ver tus certificados"
          onClick={() => navigate("/estudiante/certificados")}
        />
        <Card
          icon={<LiveTvIcon fontSize="large" />}
          title="Transmisiones"
          count={transmisiones}
          subtitle="Accede a transmisiones"
          onClick={() => navigate("/transmisiones")}
        />
        <Card
          icon={<PeopleIcon fontSize="large" />}
          title="Comunidad"
          count=""
          subtitle="Únete a la comunidad"
          onClick={() => navigate("/Comunidad")}
        />
      </div>
    </div>
  );
}

export default Escritorio;