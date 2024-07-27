import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';

export default function CompraExitosa() {
    const navigate = useNavigate();

    const handleContinuar = () => {
        navigate('/estudiante/cursosInscritos');
    };

    const handleHablaConAsesor = () => {
        window.open('https://api.whatsapp.com/send?phone=573126096603&text=Hola%2C%20Quiero%20mas%20informaci%C3%B3n%20sobre%20Llave%20Para%20Las%20Naciones.', '_blank');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto text-center transform transition-transform duration-300 scale-95 hover:scale-100">
                <div className="mb-4">
                    <svg className="w-16 h-16 mx-auto text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">¡Compra Exitosa!</h2>
                <p className="text-gray-600 mb-4">Tu compra se ha completado exitosamente. Gracias por tu compra.</p>
                <p className="text-gray-600 mb-6">Serás redirigido a tu dashboard o perfil de usuario.</p>
                <div className="flex flex-col items-center space-y-4">
                    <button
                        onClick={handleContinuar}
                        className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-600 transition duration-300 text-lg"
                    >
                        Continuar
                    </button>
                    <button
                        onClick={handleHablaConAsesor}
                        className="bg-green-500 text-white py-2 px-4 rounded-lg shadow flex items-center space-x-2 hover:bg-green-600 transition duration-300"
                    >
                        <FaWhatsapp className="w-5 h-5" />
                        <span>Habla con un asesor</span>
                    </button>
                </div>
            </div>
        </div>
    );
}