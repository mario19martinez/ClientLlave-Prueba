import { useState } from "react";

function PreguntasRespueestas() {
  const [historial, setHistorial] = useState([]);

  const handlePreguntaSubmit = (pregunta) => {
    //Agregar la nueva pregunta al historial
    setHistorial([
      ...historial,
      { pregunta, respuesta: "Respuesta de ejemplo" },
    ]);
  };

  return (
    <div className="container mx-auto p-4 w-1/2 h-auto -translate-y-72">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Preguntas & Respuestas</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const pregunta = e.target.pregunta.value;
          if (pregunta.trim() !== "") {
            handlePreguntaSubmit(pregunta);
            e.target.reset();
          }
        }}
        className="mb-4"
      >
        <label className="block mb-2 font-semibold text-gray-800">
          Pregunta:
          <input type="text" name="pregunta"
          placeholder="Haz tu pregunta"
          className="border p-2 w-full font-normal" />
        </label>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
          Enviar Pregunta
          </button>
      </form>
      <div>
        {historial.map((item, index) => (
          <div key={index} className="mb-4">
            <strong className="font-bold">Pregunta</strong> {item.pregunta}
            <br />
            <strong className="font-bold">Respuesta:</strong> {item.respuesta}
            <hr className="my-2"/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PreguntasRespueestas;
