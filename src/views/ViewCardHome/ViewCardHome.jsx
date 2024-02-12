import CardObsequio from "../../Components/CardObsequio/CardObsequio";
import Noticias from "../../Components/Noticias/Noticias";
import CardEntrenamiento from "../../Components/CardEntrenamiento/CardEntrnamiento";

export default function Viewcardhome() {
  return (
      <div className="w-72 flex flex-col" >
        <div className="pt-2">
          <CardObsequio />
        </div>
        <div className="pt-2">
          <CardEntrenamiento />
        </div>
        <div className="pt-2">
          <Noticias />
        </div>
    </div>
  );
}