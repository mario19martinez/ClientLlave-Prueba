import DetallesDiplomatura from "../../../Components/Estudiante/EstudianteDiplomatura/DetallesDiplomatura";
import NavUser from "../../../Components/Estudiante/NavUser/NavUser";
import SidebarUser from "../../../Components/Estudiante/SidebarUser/SidebarUser";

export default function ViewDiplomaturaDetailsStudent() {
  return (
    <div>
      <NavUser />
      <div className="flex">
        <SidebarUser />
        <DetallesDiplomatura />
      </div>
    </div>
  );
}