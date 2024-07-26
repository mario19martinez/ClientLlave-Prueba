import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CompraExitosa() {
    const navigate = useNavigate();

    useEffect(() => {
        // Verificar si el usuario ha iniciado sesión
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        if (isLoggedIn) {
            // Redirigir al usuario a /estudiante/cursosInscritos si ha iniciado sesión
            navigate('/estudiante/cursosInscritos');
        } else {
            // Redirigir al usuario a /login si no ha iniciado sesión
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto text-center transform transition-transform duration-300 scale-95 hover:scale-100">
                <div className="mb-4">
                    <svg className="w-16 h-16 mx-auto text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">¡Compra Exitosa!</h2>
                <p className="text-gray-600 mb-6">Tu compra se ha completado exitosamente. Gracias por tu compra.</p>
                <button
                    onClick={() => navigate('/estudiante/cursosInscritos')}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300"
                >
                    Aceptar
                </button>
            </div>
        </div>
    );
}