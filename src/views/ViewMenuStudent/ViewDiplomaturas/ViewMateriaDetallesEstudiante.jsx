import { useNavigate } from "react-router-dom";
import ClasesEstudiantesDiplomatura from "../../../Components/Estudiante/EstudianteDiplomatura/ClasesEstudiantesDiplomatura";
import DetallesMateriasEstudiante from "../../../Components/Estudiante/EstudianteDiplomatura/DetallesMateriasEstudiante";
import NavUser from "../../../Components/Estudiante/NavUser/NavUser";
import SidebarUser from "../../../Components/Estudiante/SidebarUser/SidebarUser";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ViewMateriasEstudianteDetalles() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <NavUser />
      <div className="flex">
        <div className="sticky top-0 h-screen">
          <SidebarUser />
        </div>
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <section className="max-w-6xl mx-auto space-y-10">
            {/* Botón de volver */}
            <button
              onClick={() => navigate(-1)}
              className="mb-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
              title="Volver"
            >
              <ArrowBackIcon />
            </button>

            <DetallesMateriasEstudiante />
            <ClasesEstudiantesDiplomatura />
          </section>
        </main>
      </div>
    </div>
  );
}
