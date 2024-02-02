import SidebarUser from "../../Components/Estudiante/SidebarUser/SidebarUser";
import NavUser from "../../Components/Estudiante/NavUser/NavUser";
import MyPost from "../../Components/Estudiante/MyPost/MyPost";
import Footer from "../../Components/Footer/Footer";
import { useState } from "react";

export default function ViewMyPost() {
    const [selectedTab] = useState('Publicaciones')
    return(
        <div>
            <div>
            <NavUser />
           <SidebarUser selectedTab={selectedTab} />
           <MyPost />
           </div>
           <Footer /> 
        </div>
    )
}