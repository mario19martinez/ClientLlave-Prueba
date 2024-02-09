import NavUser from "../../Components/Estudiante/NavUser/NavUser";
//import Cursos from "../../Components/Admin/Cursos/Cursos";
import CursoDetail from "../../Components/CursoDetail/CursoDetail";
import Cursos from '../../Components/Cursos/Cursos'
import { useNavigate } from "react-router-dom";

export default function ViewClasesUser() {
  const navigate = useNavigate();

  return (
    <div>
      <NavUser />
      <button 
      onClick={() => navigate('/estudiante/cursosInscritos')}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 translate-y-2 translate-x-8 rounded transition duration-300 ease-in-out">
        Atras
      </button>
      <div className="flex flex-col">
        <CursoDetail />
          <Cursos />
      </div>
    </div>
  );
}
