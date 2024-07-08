import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

function AddUserModulo({ moduloId }) {
  const [userSub, setUserSub] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [hasPaid, setHasPaid] = useState({});

  const handleBuscar = async () => {
    try {
      setLoading(true);
      setError(null);
      setUserNotFound(false);

      if (!busqueda.trim()) {
        setResultados([]);
        return;
      }

      const response = await axios.get("/search-user", {
        params: {
          name: busqueda.toLowerCase(),
          moduloId,
        },
      });

      const { usuarios } = response.data;

      if (usuarios.length === 0) {
        setUserNotFound(true);
        setResultados([]);
      } else {
        const usuariosSub = usuarios.map((usuario) => ({
          ...usuario,
          userSub: usuario.sub,
        }));
        setResultados(usuariosSub);
      }
    } catch (error) {
      console.error("Error al buscar usuarios:", error.message);
      setError(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const memoizedResultados = useMemo(() => resultados, [resultados]);

  const handleSubmit = async (e, userSub) => {
    e.preventDefault();
    try {
      const response = await axios.post("/add-user-to-modulo", {
        userSub: userSub,
        moduloId: moduloId,
        hasPaid: hasPaid[userSub],
      });
      setMessage(response.data.message);
      toast.success("Usuarios agreagdo con exito!", {
        position: "top-center",
        autoClose: 1200,
        closeOnClick: true,
        theme: "light",
      });
      setUserSub("");
    } catch (error) {
      setError(error.response.data.error);
      toast.warning("El usuario ya esta inscrito en el modulo!", {
        position: "top-center",
        autoClose: 1800,
        closeOnClick: true,
        theme: "light",
      });
    }
  };

  const handlePaidChange = (userSub, value) => {
    setHasPaid((prevHasPaid) => ({
      ...prevHasPaid,
      [userSub]: value,
    }));
  };

  return (
    <div className="mx-auto w-1/2 p-4 bg-blue-100 rounded-md shadow-md h-auto">
      <h2 className="text-lg font-bold mb-4 text-gray-700">Agregar Usuario</h2>
      <div className="mb-4">
        <label
          htmlFor="userSearch"
          className="block text-sm font-medium text-gray-700"
        >
          Buscar Usuario por Nombre:
        </label>
        <div className="flex">
          <input
            id="userSearch"
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onBlur={handleBuscar}
            className="mt-1 p-2 flex-1 border rounded-md bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={handleBuscar}
            className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Buscar
          </button>
        </div>
        {loading && <p className="text-gray-500 mt-2">Buscando usuarios...</p>}
        {error && <p className="text-red-600 mt-2">Error: {error}</p>}
        {userNotFound && (
          <p className="text-red-600 mt-2">
            El Usuario no está en la plataforma.
          </p>
        )}
        {memoizedResultados.length > 0 && (
          <ul className="mt-1 border border-gray-200 rounded-md divide-y divide-gray-200">
            {memoizedResultados.map((user, index) => (
              <li
                key={index}
                className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 bg-white"
              >
                <div>
                  <span>
                    {user.name} {user.last_name}
                  </span>
                </div>
                <div className="flex items-center">
                  <label htmlFor="" className="mr-2">
                    ¿Pagó?
                  </label>
                  <input
                    type="checkbox"
                    checked={!!hasPaid[user.userSub]} // Usa el valor específico del usuario
                    onChange={(e) =>
                      handlePaidChange(user.userSub, e.target.checked)
                    }
                    className="form-checkbox h-5 w-5 text-blue-500"
                  />
                </div>
                <button
                  onClick={(e) => handleSubmit(e, user.userSub)}
                  className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Agregar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {message && <p className="text-green-600 mt-2">{message}</p>}
      <ToastContainer />
    </div>
  );
}

AddUserModulo.propTypes = {
  moduloId: PropTypes.string.isRequired,
  closeModalAndReload: PropTypes.func.isRequired,
};

export default AddUserModulo;
