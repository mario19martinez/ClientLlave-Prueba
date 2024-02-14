import CardObsequio from "../../Components/CardObsequio/CardObsequio";
import Noticias from "../../Components/Noticias/Noticias";
import CardEntrenamiento from "../../Components/CardEntrenamiento/CardEntrnamiento";

export default function Viewcardhome() {
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center md:items-start">
      <div className="w-full md:w-72 flex flex-col justify-center items-center md:items-start pt-2 md:pt-0 md:pr-2">
        <h2 className="text-center text-2xl font-bold text-blue-900 mt-5 mb-5 pl-16"> Mas de llave </h2>
        <div className="pt-7 animate-fade-in">
          <CardObsequio />
        </div>
        <div className="pt-28 animate-fade-in">
          <CardEntrenamiento />
        </div>
      </div>
      <div className="w-full md:w-72 pt-20 animate-fade-in">
        <Noticias />
      </div>
    </div>
  );
}