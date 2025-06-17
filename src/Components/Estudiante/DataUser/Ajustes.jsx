import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserData, updateUser } from "../../../Redux/features/Users/usersSlice";
import UploadWidget from "../../UploadWidget/UploadWidget";
import CircularProgress from "@mui/material/CircularProgress";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { toast, ToastContainer } from "react-toastify";

function Ajustes() {
  const [mostrarPerfil, setMostrarPerfil] = useState(true);
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [contrasena, setContrasena] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.userData);
  const storedEmail = localStorage.getItem("email");

  const [usuario, setUsuario] = useState({
    name: "",
    last_name: "",
    pais: "",
    telefono: "",
    email: "",
    image: "",
    contraseña: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    name: "",
    last_name: "",
    pais: "",
    telefono: "",
    email: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (storedEmail) {
          await dispatch(getUserData(storedEmail));
        }
      } catch {
        setError("Error al obtener los datos del usuario.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [dispatch, storedEmail]);

  useEffect(() => {
    if (userData) setUsuario(userData);
  }, [userData]);

  const handleImageUpload = (image) => {
    setUsuario((prev) => ({ ...prev, image }));
  };

  const handleBotonClick = (boton) => {
    setMostrarPerfil(boton === "perfil");
    setMostrarContraseña(boton === "contraseña");
  };

  const handleEditableChange = (e, campo) => {
    const valor = e.target.innerText;
    setUsuario((prev) => ({ ...prev, [campo]: valor }));
  };

  const validarCampos = () => {
    const errores = { ...errorMessages };
    let valido = true;

    const campos = ["name", "last_name", "pais", "telefono", "email"];
    campos.forEach((campo) => {
      if (!usuario[campo]?.trim()) {
        errores[campo] = `El campo ${campo} no debe estar vacío.`;
        valido = false;
      } else {
        errores[campo] = "";
      }
    });

    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailPattern.test(usuario.email)) {
      errores.email = "Correo no válido";
      valido = false;
    }

    setErrorMessages(errores);
    return valido;
  };

  const handleContrasenaChange = (e) => {
    setContrasena(e.target.value);
  };

  const guardarCambios = async () => {
    setLoading(true);
    setError(null);
    try {
      const actualizado = { ...usuario, contraseña: contrasena };
      await dispatch(updateUser({ id: userData.identificacion, userData: actualizado }));
      toast.success("Información actualizada con éxito!", { position: "top-center", autoClose: 1500 });
      setTimeout(() => window.location.reload(), 1000);
    } catch {
      setError("Error al actualizar los datos del usuario.");
      toast.error("Error al actualizar los datos del usuario.", { position: "top-center", autoClose: 1500 });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="text-center">
          <p className="text-gray-600 mt-4 font-semibold">Cargando...</p>
          <CircularProgress />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="text-center">
          <p className="text-red-500 font-semibold">Error: {error}</p>
          <SentimentVeryDissatisfiedIcon fontSize="large" className="text-red-500 mt-2" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-10 bg-gray-50">
      <ToastContainer />
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => handleBotonClick("perfil")}
            className={`px-4 py-2 rounded-md font-medium transition ${
              mostrarPerfil ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-blue-100"
            }`}
          >
            Perfil
          </button>
          <button
            onClick={() => handleBotonClick("contraseña")}
            className={`px-4 py-2 rounded-md font-medium transition ${
              mostrarContraseña ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-blue-100"
            }`}
          >
            Contraseña
          </button>
        </div>

        {mostrarPerfil && (
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-2 mb-4">
              {usuario.image ? (
                <img
                  src={usuario.image}
                  alt="Imagen de perfil"
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  Sin imagen
                </div>
              )}
              <UploadWidget onImageUpload={handleImageUpload} />
            </div>

            {[
              { label: "Nombre", campo: "name" },
              { label: "Apellido", campo: "last_name" },
              { label: "País", campo: "pais" },
              { label: "Teléfono", campo: "telefono" },
              { label: "Correo", campo: "email" },
            ].map(({ label, campo }) => (
              <div key={campo}>
                <label className="block font-medium">{label}</label>
                <div
                  className="mt-1 border border-gray-300 rounded-md p-2 bg-white"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleEditableChange(e, campo)}
                  dangerouslySetInnerHTML={{ __html: usuario[campo] || "" }}
                ></div>
                {errorMessages[campo] && (
                  <p className="text-red-500 text-sm mt-1">{errorMessages[campo]}</p>
                )}
              </div>
            ))}

            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  if (validarCampos()) guardarCambios();
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        )}

        {mostrarContraseña && (
          <div className="space-y-4">
            <div>
              <label className="block font-medium">Nueva contraseña</label>
              <input
                type="password"
                className="w-full mt-1 border border-gray-300 rounded-md p-2"
                placeholder="Nueva contraseña"
              />
            </div>
            <div>
              <label className="block font-medium">Confirmar contraseña</label>
              <input
                type="password"
                className="w-full mt-1 border border-gray-300 rounded-md p-2"
                value={contrasena}
                onChange={handleContrasenaChange}
                placeholder="Confirmar contraseña"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={guardarCambios}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition"
              >
                Cambiar contraseña
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Ajustes;