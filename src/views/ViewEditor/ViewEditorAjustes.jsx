import { useState } from "react";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarEditor from "../../Components/ComponentEditor/SidebarEditor";
import AjustesAdmin from "../../Components/Admin/AjustesAdmin/AjustesAdmin";

export default function ViewEditorAjustes() {
  const [selectedTab] = useState("Ajustes");

  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarEditor selectedTab={selectedTab} />
        <AjustesAdmin />
      </div>
    </div>
  );
}