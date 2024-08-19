import { useNavigate } from "react-router-dom";
import {
  MdStar,
  MdSupervisorAccount,
  MdLibraryBooks,
  MdPeople,
  MdRecordVoiceOver,
  MdVideoLibrary,
  MdVideoCameraBack,
  MdArticle,
} from "react-icons/md";

export default function AdminPage() {
  const navigate = useNavigate();

  const handleNavigate = (path) => () => {
    navigate(path);
  };

  return (
    <div className="py-12 px-6 sm:px-12 lg:px-32 flex flex-col items-center bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-10 text-gray-900">
        Funcionalidades y elementos de la página principal
      </h1>
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Secciones a editar
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <button
            onClick={handleNavigate("/admin/blogs")}
            className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white py-3 px-5 rounded-lg shadow-lg transition duration-300 ease-in-out"
          >
            <MdLibraryBooks className="mr-2" /> Blogs
          </button>
          <button
            onClick={handleNavigate("/admin/Egresados")}
            className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white py-3 px-5 rounded-lg shadow-lg transition duration-300 ease-in-out"
          >
            <MdSupervisorAccount className="mr-2" /> Egresados
          </button>
          <button
            onClick={handleNavigate("/admin/informacion")}
            className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-5 rounded-lg shadow-lg transition duration-300 ease-in-out"
          >
            <MdStar className="mr-2" /> Entrenamiento Profético
          </button>
          <button
            onClick={handleNavigate("/admin/profetico/")}
            className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white py-3 px-5 rounded-lg shadow-lg transition duration-300 ease-in-out"
          >
            <MdLibraryBooks className="mr-2" /> Entrenando tus sentidos espirituales
          </button>
          <button
            onClick={handleNavigate("/admin/nosotros")}
            className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-5 rounded-lg shadow-lg transition duration-300 ease-in-out"
          >
            <MdPeople className="mr-2" /> Nosotros
          </button>
          <button
            onClick={handleNavigate("/admin/noticias")}
            className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white py-3 px-5 rounded-lg shadow-lg transition duration-300 ease-in-out"
          >
            <MdArticle className="mr-2" /> Noticias
          </button>
          <button
            onClick={handleNavigate("/admin/testimonios")}
            className="flex items-center justify-center bg-purple-500 hover:bg-purple-600 text-white py-3 px-5 rounded-lg shadow-lg transition duration-300 ease-in-out"
          >
            <MdRecordVoiceOver className="mr-2" /> Testimonios
          </button>
          <button
            onClick={handleNavigate("/admin/transmisiones")}
            className="flex items-center justify-center bg-teal-500 hover:bg-teal-600 text-white py-3 px-5 rounded-lg shadow-lg transition duration-300 ease-in-out"
          >
            <MdVideoLibrary className="mr-2" /> Transmisiones
          </button>
          <button
            onClick={handleNavigate("/admin/videos")}
            className="flex items-center justify-center bg-pink-500 hover:bg-pink-600 text-white py-3 px-5 rounded-lg shadow-lg transition duration-300 ease-in-out"
          >
            <MdVideoCameraBack className="mr-2" /> Videos
          </button>
        </div>
      </div>
    </div>
  );
}