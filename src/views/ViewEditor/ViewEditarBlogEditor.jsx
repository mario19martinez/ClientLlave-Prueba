import { useState } from "react";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarEditor from "../../Components/ComponentEditor/SidebarEditor";
import EditarBlogEditor from "../../Components/ComponentEditor/EditorBlog/EditarBlogEditor";
import { useParams } from "react-router-dom";

export default function ViewEditarBlogEditor() {
  const [selectedTab] = useState("Blogs");
  const { id } = useParams();

  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarEditor selectedTab={selectedTab} />
        <EditarBlogEditor blogId={id} />
      </div>
    </div>
  );
}