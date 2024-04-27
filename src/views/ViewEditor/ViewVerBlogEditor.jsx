import { useState } from "react";
import { useParams } from "react-router-dom";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarEditor from "../../Components/ComponentEditor/SidebarEditor";
import VerBlog from "../../Components/ComponentEditor/EditorBlog/VerBlog";

export default function ViewVerBlogEditor() {
  const [selectedTab] = useState("Blogs");
  const { id } = useParams();

  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarEditor selectedTab={selectedTab} />
        <VerBlog blogId={id} />
      </div>
    </div>
  );
}