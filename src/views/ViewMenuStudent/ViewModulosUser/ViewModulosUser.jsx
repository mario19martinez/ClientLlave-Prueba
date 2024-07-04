import NavUser from "../../../Components/Estudiante/NavUser/NavUser";
import SidebarUser from "../../../Components/Estudiante/SidebarUser/SidebarUser";
import ModulosUser from "../../../Components/Estudiante/EstudianteNiveles/EstudianteModulo/ModulosUser";

export default function ViewModulosUser() {
  return (
    <div>
      <NavUser />
      <div className="flex">
        <SidebarUser selectedTab="defaultTab" />
        <ModulosUser />
      </div>
    </div>
  );
}
