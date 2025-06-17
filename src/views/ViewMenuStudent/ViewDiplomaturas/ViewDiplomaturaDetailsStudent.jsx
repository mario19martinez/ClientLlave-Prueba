import { useNavigate } from "react-router-dom";
import DetallesDiplomatura from "../../../Components/Estudiante/EstudianteDiplomatura/DetallesDiplomatura";
import MateriasEstudiante from "../../../Components/Estudiante/EstudianteDiplomatura/MateriasEstudiante";
import NavUser from "../../../Components/Estudiante/NavUser/NavUser";
import SidebarUser from "../../../Components/Estudiante/SidebarUser/SidebarUser";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ViewDiplomaturaDetailsStudent() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <NavUser />
      <div className="flex">
        <div className="sticky top-0 h-screen">
          <SidebarUser />
        </div>
        <div className="flex-1 px-4 sm:px-8 md:px-12 py-6">
          {/* Botón de volver */}
          <button
            onClick={() => navigate(-1)}
            className="mb-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
            title="Volver"
          >
            <ArrowBackIcon />
          </button>

          {/* Detalles de la diplomatura */}
          <DetallesDiplomatura />

          {/* Materias */}
          <MateriasEstudiante />
        </div>
      </div>
    </div>
  );
}