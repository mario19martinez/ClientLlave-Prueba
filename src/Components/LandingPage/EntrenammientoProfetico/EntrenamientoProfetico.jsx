// eslint-disable-next-line no-unused-vars
import React from "react";
import CardEntrenamiento from "../../CardEntrenamiento/CardEntrnamiento";

export default function EntrenamientoProfetico() {
  return (
    <div className="flex flex-col items-center justify-center pt-10">
      <h1 className="text-3xl font-bold mb-8">Entrenamiento Profético</h1>
      <div className="flex max-w-4xl w-full mx-auto">
        <div className="w-1/2 pr-4">
          <CardEntrenamiento />
        </div>
        <div className="w-1/2 pl-4">
          <img
            src="https://llaveparalasnaciones.online/wp-content/uploads/2023/09/28-scaled.jpg"
            alt="Entrenamiento"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}