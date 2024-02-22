// eslint-disable-next-line no-unused-vars
import React from "react";
// import AllUsers from "../AllUsers";
import AllUsersAdmin from "../AllUsersAdmin/AllUsersAdmin";
import NavAdmin from "../NavAdmin/NavAdmin";

function DashboardAdmin() {
  return (
    <div className="flex">
      <div className="w-full">
        <NavAdmin />
      </div>
      <AllUsersAdmin />
    </div>
  );
}
export default DashboardAdmin;
