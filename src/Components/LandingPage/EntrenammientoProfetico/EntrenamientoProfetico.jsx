import CardEntrenamiento from "../../CardEntrenamiento/CardEntrnamiento";
import apostol_profeta from './apostol_profeta.jpg'

export default function EntrenamientoProfetico() {
  return (
    <div className="flex flex-col items-center justify-center pt-20 pb-20">
      <h1 className="text-4xl text-gray-800 md:text-5xl font-semibold mb-10 mt-8 text-center" >Entrenamiento Profético</h1>
      <div className="flex flex-col md:flex-row max-w-5xl w-full mx-auto">
        <div className="w-full md:w-1/2 pr-4 transition duration-300 ease-in-out transform hover:scale-105">
          <CardEntrenamiento />
        </div>
        <div className="w-full md:w-1/2 pl-4 transition duration-300 ease-in-out transform hover:scale-105">
          <img
            src={apostol_profeta} 
            alt="Entrenamiento"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}