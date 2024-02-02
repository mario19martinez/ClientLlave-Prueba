// eslint-disable-next-line no-unused-vars
import React from "react";
// import AllUsers from "../AllUsers";
import MySidebar from "../Sidebar/Sidebar";
import AllUsersAdmin from "../AllUsersAdmin/AllUsersAdmin";
import NavAdmin from "../NavAdmin/NavAdmin";

function DashboardAdmin() {
    return(
        <>
        <div className="flex">
        <div className="w-full">
            <NavAdmin />
        </div>
        
        <div className="fixed left-0 top-0">
        <MySidebar />
        </div>
         <AllUsersAdmin />
        </div>
        </>
    )
}
export default DashboardAdmin;