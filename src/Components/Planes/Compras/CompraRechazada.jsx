import { FaWhatsapp } from 'react-icons/fa';

export default function CompraRechazada() {
    const handleHablaConAsesor = () => {
        window.open('https://api.whatsapp.com/send?phone=573126096603&text=Hola%2C%20tengo%20un%20problema%20con%20mi%20compra%20en%20Llave%20Para%20Las%20Naciones.', '_blank');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto text-center transform transition-transform duration-300 scale-95 hover:scale-100">
                <div className="mb-4">
                    <svg className="w-16 h-16 mx-auto text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Compra Rechazada</h2>
                <p className="text-gray-600 mb-4">Lo sentimos, tu compra ha sido rechazada. Por favor, intenta nuevamente.</p>
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