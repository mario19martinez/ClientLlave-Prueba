import { useState } from "react";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarEditor from "../../Components/ComponentEditor/SidebarEditor";
import CrearBlog from "../../Components/ComponentEditor/EditorBlog/CrearBlog";

export default function ViewCrearBlogEditor() {
  const [selectedTab] = useState("Blogs");

  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarEditor selectedTab={selectedTab} />
        <CrearBlog />
      </div>
    </div>
  );
}