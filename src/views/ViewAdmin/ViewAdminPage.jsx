import { useState } from "react";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../Components/Admin/SidebarAdmin/SidebarAdmin";
import AdminPage from "../../Components/Admin/AdminPage/AdminPage";

export default function ViewAdminPage() {
  const [selectedTab] = useState("Pagina");
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin selectedTab={selectedTab} />
        <AdminPage />
      </div>
    </div>
  );
}