import SidebarUser from "../../../Components/Estudiante/SidebarUser/SidebarUser";
import NavUser from "../../../Components/Estudiante/NavUser/NavUser";
import ModuloDetailsStudent from "../../../Components/Estudiante/EstudianteNiveles/ModuloDetailsStudent";

export default function ViewModuloClases() {
  return (
    <div>
      <NavUser />
      <div className="flex">
      <SidebarUser />
      <ModuloDetailsStudent />
      </div>
      {/* <NivelClases /> */}
    </div>
  );
}
