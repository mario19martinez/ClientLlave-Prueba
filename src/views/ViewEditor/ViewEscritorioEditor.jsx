import { useState } from "react";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarEditor from "../../Components/ComponentEditor/SidebarEditor";
import EscritorioEditor from "../../Components/ComponentEditor/EscritorioEditor";

export default function ViewEscritorioEditor() {
  const [selectedTab] = useState("Escritorio");

  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarEditor selectedTab={selectedTab} />
        <EscritorioEditor />
      </div>
    </div>
  );
}