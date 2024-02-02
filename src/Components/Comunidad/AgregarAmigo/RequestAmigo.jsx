import axios from "axios";
import { useState } from "react";

function RequestAmigo({ amigoId, onSendRequest }) {
  const [solicitudEnviada, setSolicitudEnviada] = useState(false);

  //console.log(amigoId, 'AmigoId')
  const handleSendRequest = async() => {
    try {
      const token = localStorage.getItem('token'); // Obten el token almacenado localmente

      // Verificamos que amigoId sea un valor valido antes de hacer la solicitud
      if (!amigoId) {
        console.error('Error: amigoId no es valido.', amigoId);
        return;
      }
      setSolicitudEnviada(true)

      // Realiza la solicitud con un manejo de errores detallado
      const response = await axios.post(`/send-request/${amigoId}`, {}, {
        headers: { Authorization: `Bearer ${token}`},
      })
      if (response.status >= 200 && response.status < 300) {
        console.log('Solicitud de amistad enviada con exito.')
        onSendRequest();
      } else {
        console.error('Error en la solicitud de amistad:', response.data)
        // Muestra un mensaje al usuario informando sobre el error
        alert(`Error en la solicitud de amistad: ${response.data.message}`)
        setSolicitudEnviada(false)
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error)
      //console.error('Error de axios:', error.message); // Imprime la respuesta de axios para obtener mas detalles
      setSolicitudEnviada(false)

      console.error('Respuesta completa de Axios:', error);
    }
  };

  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      onClick={handleSendRequest}
      disabled={solicitudEnviada}
    >
      {solicitudEnviada ? 'Enviada' : 'Agregar Amigo'}
    </button>
  );
}

export default RequestAmigo;
