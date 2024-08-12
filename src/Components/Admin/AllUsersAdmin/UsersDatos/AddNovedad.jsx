import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export default function AddNovedad({ userIdentificacion }) {
  const [userData, setUserData] = useState({});
  const [observacion, setObservacion] = useState("");
  const [originalObservacion, setOriginalObservacion] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/user/${userIdentificacion}`);
        const user = response.data;
        setUserData(user);
        const userObservacion = user.observacion || "";
        setObservacion(userObservacion); // Establece el valor en el textarea
        setOriginalObservacion(userObservacion);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("No se pudo obtener la información del usuario.");
        setLoading(false);
      }
    };
  
    fetchUser();
  }, [userIdentificacion]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (observacion === originalObservacion) {
      setError("No se han realizado cambios en la observación.");
      return;
    }

    try {
      const updatedUserData = { ...userData, observacion };

      // Depuración: Verificar qué datos se están enviando al servidor
      console.log("Enviando datos:", updatedUserData);

      const response = await axios.put(
        `/user/${userIdentificacion}`,
        updatedUserData,
        {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        }
      );

      // Depuración: Verificar la respuesta del servidor
      console.log("Respuesta del servidor:", response);

      if (response.status === 200) {
        setSuccess("Observación actualizada correctamente.");
        setError("");
        setOriginalObservacion(observacion);

        // Mostrar alerta al usuario
        alert("La observación ha sido modificada correctamente.");
      }
    } catch (err) {
      console.error("Error updating user:", err);
      setError("No se pudo actualizar la información del usuario.");
    }
  };

  if (loading) return <p className="text-gray-500">Cargando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">Actualizar Novedad</h2>
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="observacion"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Observación
            </label>
            <textarea
              id="observacion"
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

AddNovedad.propTypes = {
  userIdentificacion: PropTypes.string.isRequired,
};
