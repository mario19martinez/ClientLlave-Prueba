import CardObsequio from "../../Components/CardObsequio/CardObsequio";
import Noticias from "../../Components/Noticias/Noticias";
import CardEntrenamiento from "../../Components/CardEntrenamiento/CardEntrnamiento";

export default function Viewcardhome() {
  return (
    <div className="flex justify-center p-4 translate-y-2">
      <div className="flex gap-14">
        <CardObsequio />
        <CardEntrenamiento />
        <Noticias />
      </div>
    </div>
  );
}
