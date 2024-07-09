import { useNavigate } from 'react-router-dom';
import { FaChalkboardTeacher, FaLayerGroup } from 'react-icons/fa';

export default function EditorTipoAsistencia() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col px-28 md:flex-row gap-10 justify-center items-center mt-20">
            <div 
                className="max-w-sm w-full h-64 bg-white shadow-2xl rounded-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => navigate('/Editor/Asistencia')}
            >
                <div className="flex flex-col items-center justify-center h-full p-8">
                    <FaChalkboardTeacher className="text-blue-500 text-6xl mb-4" />
                    <div className="text-center">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Asistencia de Clases</h3>
                        <p className="text-gray-600">Asistencia de las clases con la lógica antigua.</p>
                    </div>
                </div>
            </div>
            
            <div 
                className="max-w-sm w-full h-64 bg-white shadow-2xl rounded-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => navigate('/Editor/AsistenciaNiveles')}
            >
                <div className="flex flex-col items-center justify-center h-full p-8">
                    <FaLayerGroup className="text-green-500 text-6xl mb-4" />
                    <div className="text-center">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Asistencia de Niveles</h3>
                        <p className="text-gray-600">Asistencia de las clases de los niveles y módulos.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}