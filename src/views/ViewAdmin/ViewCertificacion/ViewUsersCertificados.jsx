import { useState } from "react";
import { useParams } from "react-router-dom";
import UserCertificados from "../../../Components/Admin/Certificacion/UsersCertificados";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";

export default function ViewUsersCertificados() {
  const [selectedTab] = useState("Ceritificados");
  const { idCurso } = useParams();
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <div className="sticky top-0 h-screen">
          <SidebarAdmin selectedTab={selectedTab}/>
        </div>
        <UserCertificados cursoId={idCurso} />
      </div>
    </div>
  );
}