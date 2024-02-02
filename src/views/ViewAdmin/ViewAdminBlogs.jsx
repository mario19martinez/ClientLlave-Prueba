import SidebarAdmin from "../../Components/Admin/SidebarAdmin/SidebarAdmin";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import AdminBlogs from "../../Components/Admin/AdminBlogs/AdminBlogs";
import { useState } from "react";

export default function ViewAdminBlogs() {
  const [selectedTab] = useState("Blogs");
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <div>
          <SidebarAdmin />
        </div>
        <AdminBlogs selectedTab={selectedTab} />
      </div>
    </div>
  );
}
