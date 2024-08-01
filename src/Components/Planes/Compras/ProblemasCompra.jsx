import { FaWhatsapp } from 'react-icons/fa';

export default function ProblemasCompra() {
    const handleHablaConAsesor = () => {
        window.open('https://api.whatsapp.com/send?phone=573126096603&text=Hola%2C%20estoy%20teniendo%20problemas%20para%20realizar%20una%20compra%20en%20Llave%20Para%20Las%20Naciones.', '_blank');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto text-center transform transition-transform duration-300 scale-95 hover:scale-100">
                <div className="mb-4">
                    <svg className="w-16 h-16 mx-auto text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m0-4h.01M12 19h.01" />
                    </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Problemas al Realizar la Compra</h2>
                <p className="text-gray-600 mb-4">Estamos experimentando problemas con tu compra. Por favor, intenta nuevamente más tarde o habla con un asesor.</p>
                <div className="flex flex-col items-center space-y-4">
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