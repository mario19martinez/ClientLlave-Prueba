import CardObsequio from "../../Components/CardObsequio/CardObsequio";
import Noticias from "../../Components/Noticias/Noticias";
import CardEntrenamiento from "../../Components/CardEntrenamiento/CardEntrnamiento";

export default function Viewcardhome() {
  return (
    <div className="flex justify-center p-4 translate-y-2">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/3">
          <CardObsequio />
        </div>
        <div className="w-full sm:w-1/3">
          <CardEntrenamiento />
        </div>
        <div className="w-full sm:w-1/3">
          <Noticias />
        </div>
      </div>
    </div>
  );
}
