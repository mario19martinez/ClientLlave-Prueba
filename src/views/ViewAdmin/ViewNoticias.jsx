import SidebarAdmin from "../../Components/Admin/SidebarAdmin/SidebarAdmin";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import NoticiasAdmin from "../../Components/Admin/NoticiasAdmin/NoticiasAdmin";
import { useState } from "react";

export default function ViewNoticias () {
    const [selectedTab] = useState("Noticias")
    return (
        <div>
          <NavAdmin />
          <SidebarAdmin selectedTab={selectedTab}/>
          <NoticiasAdmin />
        </div>
      );
}