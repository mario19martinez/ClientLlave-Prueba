import { useState } from "react";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../Components/Admin/SidebarAdmin/SidebarAdmin";
import TestimoniosAdmin from "../../Components/Admin/TestimoniosAdmin/TestimoniosAdmin";

export default function ViewAdminTestimonio() {
  const [selectedTab] = useState("Testimonios");
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin selectedTab={selectedTab} />
        <TestimoniosAdmin />
      </div>
    </div>
  );
}
