// eslint-disable-next-line no-unused-vars
import React from "react";
import NavUser from "../../../Components/Estudiante/NavUser/NavUser";
import SidebarUser from "../../../Components/Estudiante/SidebarUser/SidebarUser";
import LevelDetailsStudent from "../../../Components/Estudiante/EstudianteNiveles/LevelDetailsStudent";
import { useParams } from "react-router-dom";

export default function ViewLevelsDetails() {
  const { id } = useParams();

  return (
    <div>
      <NavUser />
      <div className="flex">
        <SidebarUser />
        <LevelDetailsStudent nivelId={id} />
      </div>
    </div>
  );
}