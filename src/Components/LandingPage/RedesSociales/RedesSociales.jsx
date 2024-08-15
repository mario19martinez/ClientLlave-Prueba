import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
import gifSocial from '../../../assets/gifSocial.gif';

export default function RedesSociales() {
    return (
        <div className="flex flex-col md:flex-row items-center px-6 md:px-20 py-10 md:py-14 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200">
            <div className="text-center md:text-center justify-center items-center w-full md:w-1/2 space-y-4 md:space-y-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">REDES SOCIALES</h1>
                <p className="text-base md:text-lg text-gray-600">
                    ¡No te pierdas nuestras últimas novedades y actualizaciones! <br />
                    Síguenos en nuestras redes sociales para que estés atento a todo.
                    ¡Te esperamos!
                </p>
                <div className="flex justify-center md:justify-center space-x-4 mt-4">
                    <a href="https://www.facebook.com/llaveparalasnaciones" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                        <FaFacebookF size={24} />
                    </a>
                    <a href="https://www.instagram.com/llaveparalasnacionesoficial" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                        <FaInstagram size={24} />
                    </a>
                    <a href="https://www.youtube.com/@LlaveparalasNaciones" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800">
                        <FaYoutube size={24} />
                    </a>
                    <a href="https://www.tiktok.com/@llaveparalasnacionesok" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-800">
                        <FaTiktok size={24} />
                    </a>
                </div>
            </div>
            <div className="mt-6 md:mt-8 w-full md:w-1/2">
                <img src={gifSocial} alt="gifSocial" className="max-w-full h-auto rounded-lg" />
            </div>
        </div>
    );
}