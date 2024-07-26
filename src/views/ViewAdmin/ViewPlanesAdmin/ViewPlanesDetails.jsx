import { useState } from "react";
import { useParams } from "react-router-dom";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import DetallesPlan from "../../../Components/Admin/Planes/DetallesPlan";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";

export default function ViewPlanesDetails() {
  const [selectedTab] = useState("Ventas");
  const { PlanId } = useParams();

  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin selectedTab={selectedTab} />
        <DetallesPlan PlanId={PlanId} />
      </div>
    </div>
  );
}