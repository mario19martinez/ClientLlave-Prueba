// eslint-disable-next-line no-unused-vars
import React from "react";
import CardEntrenamiento from "../../CardEntrenamiento/CardEntrnamiento";
import { Transition } from "@headlessui/react";

export default function EntrenamientoProfetico() {
  return (
    <div className="flex flex-col items-center justify-center pt-10 w-screen">
      <h1 className="text-3xl font-bold mb-8">Entrenamiento Profético</h1>
      <div className="flex max-w-4xl w-full mx-auto">
        <Transition
          as="div"
          className="w-1/2 pr-4"
          enter="transform transition ease-in-out duration-500 sm:duration-700"
          enterFrom="opacity-0 translate-x-[-100%]"
          enterTo="opacity-100 translate-x-0"
        >
          <CardEntrenamiento />
        </Transition>
        <Transition
          as="div"
          className="w-1/2 pl-4"
          enter="transform transition ease-in-out duration-500 sm:duration-700"
          enterFrom="opacity-0 translate-x-[100%]"
          enterTo="opacity-100 translate-x-0"
        >
          <img
            src="https://llaveparalasnaciones.online/wp-content/uploads/2023/09/28-scaled.jpg"
            alt="Entrenamiento"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </Transition>
      </div>
    </div>
  );
}