import NavUser from "../../Components/Estudiante/NavUser/NavUser";
import ModuloMonitor from "../../Components/Monitor/ModuloMonitor";
import SidebarMonitor from "../../Components/Monitor/SidebarMonitor";

export default function ViewMonitorModulos() {
  return (
    <div>
      <NavUser />
      <div className="flex">
        <SidebarMonitor />
        <ModuloMonitor />
      </div>
    </div>
  );
}