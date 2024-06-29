import { useState } from "react";
import { useParams } from "react-router-dom";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import SelectedGrupo from "../../../Components/Admin/Certificacion/CertificadoNivel/SelectedGrupo";

export default function ViewSelectedGrupoNivel() {
  const [selectedTab] = useState("Ceritificados");
  const { nivelId } = useParams();
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <div className="sticky top-0 h-screen">
          <SidebarAdmin selectedTab={selectedTab} />
        </div>
        <SelectedGrupo id={nivelId} />
      </div>
    </div>
  );
}