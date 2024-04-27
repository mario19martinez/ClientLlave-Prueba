import { useState } from "react";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarEditor from "../../Components/ComponentEditor/SidebarEditor";
import Blogs from "../../Components/ComponentEditor/EditorBlog/Blogs";

export default function ViewBlogEditor() {
  const [selectedTab] = useState("Blogs");

  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarEditor selectedTab={selectedTab} />
        <Blogs />
      </div>
    </div>
  );
}
