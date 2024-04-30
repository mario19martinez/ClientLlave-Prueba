import { useState } from "react";
import { useParams } from "react-router-dom";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../Components/Admin/SidebarAdmin/SidebarAdmin";
import EditarBlog from "../../Components/Admin/AdminBlogs/EditarBlog";

export default function ViewBlogEdit() {
  const [selectedTab] = useState("Blogs");
  const { id } = useParams();

  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin selectedTab={selectedTab} />
        <EditarBlog blogId={id} />
      </div>
    </div>
  );
}