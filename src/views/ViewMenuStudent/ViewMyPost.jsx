import SidebarUser from "../../Components/Estudiante/SidebarUser/SidebarUser";
import NavUser from "../../Components/Estudiante/NavUser/NavUser";
import MyPost from "../../Components/Estudiante/MyPost/MyPost";
import { useState } from "react";

export default function ViewMyPost() {
  const [selectedTab] = useState("Publicaciones");
  return (
    <div className="bg-gray-200">
      <NavUser />
      <div className="flex">
        <SidebarUser selectedTab={selectedTab} />
        <MyPost />
      </div>
    </div>
  );
}
