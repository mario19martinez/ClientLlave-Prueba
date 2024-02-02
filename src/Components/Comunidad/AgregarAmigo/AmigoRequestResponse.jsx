import axios from "axios";

function AmigoRequestResponse({ requestId, onAccept, onReject }) {
  const handleResponse = async (response) => {
    try {
      await axios.put(`/accept-request/${requestId}`, { response });
      if (response === "accept") {
        onAccept();
      } else {
        onReject();
      }
    } catch (error) {
      console.error(
        `Error al ${
          response === "accept" ? "aceptar" : "rechazar"
        } la solicitud de amistad:`,
        error
      );
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border border-gray-300 rounded shadow-md">
      <button onClick={() => handleResponse("accept")}
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >Aceptar</button>
      <button onClick={() => handleResponse("reject")}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >Rechazar</button>
    </div>
  );
}

export default AmigoRequestResponse;
