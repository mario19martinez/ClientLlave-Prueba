import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../Components/Admin/SidebarAdmin/SidebarAdmin";
import CrearBlog from "../../Components/Admin/AdminBlogs/CrearBlog";
import { useState } from "react";

export default function ViewBlogCreate() {
  const [selectedTab] = useState("Blogs");
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin selectedTab={selectedTab} />
        <CrearBlog />
      </div>
    </div>
  );
}
