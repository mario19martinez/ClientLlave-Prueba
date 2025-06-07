import { useState } from "react";
import Diplomaturas from "../../../Components/Admin/AdminDiplomatura/Diplomatura/Diplomaturas";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import AdministrarDiplomatura from "../../../Components/Admin/AdminDiplomatura/Diplomatura/AdminitrarDiplomatura";
import { ToastContainer } from "react-toastify";

export default function ViewAdminDiplomatura() {
  const [selectedTab] = useState("Diplomaturas");
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const handleReload = () => setReloadTrigger((prev) => prev + 1);

  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin selectedTab={selectedTab} />
        <div className="flex-1 px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Diplomaturas</h1>
          
          <AdministrarDiplomatura
            onReload={handleReload}
            onSearchChange={setSearchTerm}
            onSortChange={setSortOrder}
          />

          <Diplomaturas
            reloadTrigger={reloadTrigger}
            searchTerm={searchTerm}
            sortOrder={sortOrder}
          />
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}