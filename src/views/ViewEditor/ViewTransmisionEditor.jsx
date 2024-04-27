import { useState } from "react";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarEditor from "../../Components/ComponentEditor/SidebarEditor";
import TransmisionAdmin from "../../Components/Admin/Transmiciones/TransmisionesAdmin";

export default function ViewTransmisionEditor() {
  const [selectedTab] = useState("Transmisión");

  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarEditor selectedTab={selectedTab} />
        <TransmisionAdmin />
      </div>
    </div>
  );
}