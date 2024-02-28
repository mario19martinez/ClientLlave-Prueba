// eslint-disable-next-line no-unused-vars
import React from "react";
import { MdStar, MdSupervisorAccount, MdLibraryBooks, MdPeople, MdRecordVoiceOver } from "react-icons/md";

export default function AdminPage() {
    return (
        <div className="pt-5 pb-5 justify-center">
            <h1 className="text-2xl font-bold mb-4">Funcionalidades y elementos de la página principal</h1>
            <div>
                <h2 className="text-lg font-semibold mb-2">Secciones a editar</h2>
                <div className="flex flex-col gap-4">
                    <button className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out">
                        <MdSupervisorAccount className="mr-2" /> Egresados
                    </button>
                    <button className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out">
                        <MdLibraryBooks className="mr-2" /> Entrenando tus sentidos espirituales
                    </button>
                    <button className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out">
                        <MdStar className="mr-2" /> Entrenamiento Profetico
                    </button>
                    <button className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out">
                        <MdLibraryBooks className="mr-2" /> Blogs
                    </button>
                    <button className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out">
                        <MdPeople className="mr-2" /> Nosotros
                    </button>
                    <button className="flex items-center justify-center bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out">
                        <MdRecordVoiceOver className="mr-2" /> Testimonios
                    </button>
                </div>
            </div>
        </div>
    );
}