import { useState } from "react";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../Components/Admin/SidebarAdmin/SidebarAdmin";
import Adminvideo from "../../Components/Admin/Adminvideo/Adminvideo";

export default function Viewadminvideo () {
    const [selectedTab] = useState('Video')
    
    return(
        <div>
            <NavAdmin />
            <SidebarAdmin selectedTab={selectedTab}/>
            <Adminvideo />
        </div>
    )
}