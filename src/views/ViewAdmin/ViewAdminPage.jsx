// eslint-disable-next-line no-unused-vars
import React from "react";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../Components/Admin/SidebarAdmin/SidebarAdmin";
import AdminPage from "../../Components/Admin/AdminPage/AdminPage";

export default function ViewAdminPage() {
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin />
        <div className="p-2 justify-center">
          <AdminPage />
        </div>
      </div>
    </div>
  );
}