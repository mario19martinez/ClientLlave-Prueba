import NavUser from "../../../Components/Estudiante/NavUser/NavUser";
import SidebarUser from "../../../Components/Estudiante/SidebarUser/SidebarUser";
import ModuloUserDetail from "../../../Components/Estudiante/EstudianteNiveles/EstudianteModulo/ModuloUserDetail";

export default function ViewModuloUserDetail() {
  return (
    <div>
      <NavUser />
      <div className="flex">
        <SidebarUser selectedTab="defaultTab" />
        <ModuloUserDetail />
      </div>
    </div>
  );
}
