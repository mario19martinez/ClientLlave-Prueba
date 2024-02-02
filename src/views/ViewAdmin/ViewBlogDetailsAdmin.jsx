import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../Components/Admin/SidebarAdmin/SidebarAdmin";
import VerBlog from "../../Components/Admin/AdminBlogs/VerBlog";
import { useState } from "react";

export default function ViewBlogDetailsAdmin() {
  const [selectedTab] = useState("Blogs");
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <div>
          <SidebarAdmin selectedTab={selectedTab} />
        </div>
        <VerBlog />
      </div>
    </div>
  );
}