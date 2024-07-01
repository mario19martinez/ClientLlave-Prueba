import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserData,
  updateUser,
} from "../../../Redux/features/Users/usersSlice";
import UploadWidget from "../../UploadWidget/UploadWidget";
import PropTypes from "prop-types";

export default function EditarUsuarioAdmin({ userEmail }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.userData);

  const [mostrarPerfil, setMostrarPerfil] = useState(true);
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [contrasena, setContrasena] = useState("");
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

  const [showSuccessAlert, setShowSuccessAlert] = useState(false); 

  useEffect(() => {
    if (userEmail) {
      dispatch(getUserData(userEmail));
    }
  }, [dispatch, userEmail]);

  useEffect(() => {
    if (userData) {
      setUsuario(userData);
    }
  }, [userData]);

  const handleImageUpload = (image) => {
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      image: image,
    }));
  };

  const handleBotonClick = (boton) => {
    setMostrarPerfil(boton === "perfil");
    setMostrarContraseña(boton === "contraseña");
  };

  const handleEditableChange = (e, campo) => {
    const valor = e.target.value;

    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [campo]: valor,
    }));
  };

  const validarCampos = () => {
    let isValid = true;
    const errorMessagesCopy = { ...errorMessages };

    if (usuario.name.trim() === "") {
      errorMessagesCopy.name = "El campo Nombre no debe estar vacío";
      isValid = false;
    } else {
      errorMessagesCopy.name = "";
    }

    if (usuario.last_name.trim() === "") {
      errorMessagesCopy.last_name = "El campo Apellido no debe estar vacío";
      isValid = false;
    } else {
      errorMessagesCopy.last_name = "";
    }

    if (usuario.pais.trim() === "") {
      errorMessagesCopy.pais = "El campo País no debe estar vacío";
      isValid = false;
    } else {
      errorMessagesCopy.pais = "";
    }

    if (usuario.telefono.trim() === "") {
      errorMessagesCopy.telefono = "El campo Teléfono no debe estar vacío";
      isValid = false;
    } else {
      errorMessagesCopy.telefono = "";
    }

    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailPattern.test(usuario.email)) {
      errorMessagesCopy.email = "Correo no válido";
      isValid = false;
    } else {
      errorMessagesCopy.email = "";
    }

    setErrorMessages(errorMessagesCopy);
    return isValid;
  };

  const handleContrasenaChange = (e) => {
    setContrasena(e.target.value);
  };

  const guardarCambios = async () => {
    const usuarioActualizado = {
      ...usuario,
      contraseña: contrasena,
    };

    try {
      await dispatch(
        updateUser({
          id: userData.identificacion,
          userData: usuarioActualizado,
        })
      );
      setShowSuccessAlert(true); // Mostrar alerta de éxito
      setTimeout(() => {
        setShowSuccessAlert(false); // Ocultar alerta después de cierto tiempo (opcional)
      }, 3000); // Por ejemplo, ocultar después de 3 segundos
      window.alert("Usuario actualizado correctamente."); // Mostrar alerta
      window.location.reload(); // Recargar la página
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      // Muestra un mensaje de error al usuario si es necesario
    }
  };

  useEffect(() => {
    setMostrarPerfil(true);
  }, []);

  return (
    <div className="py-2 flex flex-col items-center justify-center">
      {showSuccessAlert && (
        <div className="bg-green-200 border-green-600 border-l-4 w-full p-4 mb-4">
          <p className="text-green-800">Usuario actualizado correctamente.</p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row items-center justify-center">
        <button
          className={`mx-2 md:mx-4 px-4 py-2 ${
            mostrarPerfil ? "bg-blue-400 text-white" : "bg-gray-200"
          } text-lg mr-12 border-b-2 border-blue-500 font-medium hover:bg-blue-700 hover:text-white transform hover:scale-105 transition duration-300 ease-in-out`}
          onClick={() => handleBotonClick("perfil")}
        >
          Perfil
        </button>
        <button
          className={`mx-2 md:mx-4 px-4 py-2 ${
            mostrarContraseña ? "bg-blue-400 text-white" : "bg-gray-200"
          } text-lg mr-12 border-b-2 border-blue-500 font-medium hover:bg-blue-700 hover:text-white transform hover:scale-105 transition duration-300 ease-in-out`}
          onClick={() => handleBotonClick("contraseña")}
        >
          Contraseña
        </button>
      </div>

      {mostrarPerfil && (
        <div className="justify-center items-center">
          <div className="flex flex-col">
            <label htmlFor="imagen" className="font-medium">
              Imagen de Perfil
            </label>
            {userData?.image && (
              <img
                src={userData.image}
                alt="Imagen de perfil"
                className="mt-2 rounded-full w-20 h-20 object-cover"
              />
            )}
            <UploadWidget
              onImageUpload={handleImageUpload}
              className="p-0 mt-4"
            />

            <div className="flex py-2">
              <div className="flex flex-col px-1">
                <label htmlFor="nombre" className="font-medium">
                  Nombre:
                </label>
                <input
                  id="nombre"
                  className={`border border-blue-600 rounded-md p-2 focus:ring-blue-200 focus:border-blue-300 w-48`}
                  value={usuario.name}
                  onChange={(e) => handleEditableChange(e, "name")}
                />
                <span className="text-red-500">{errorMessages.name}</span>
              </div>

              <div className="flex flex-col px-1">
                <label htmlFor="apellido" className="font-medium">
                  Apellido:
                </label>
                <input
                  id="apellido"
                  className={`border border-blue-600 rounded-md p-2 focus:ring-blue-200 focus:border-blue-300 w-48`}
                  value={usuario.last_name}
                  onChange={(e) => handleEditableChange(e, "last_name")}
                />
                <span className="text-red-500">{errorMessages.last_name}</span>
              </div>
            </div>

            <div className="flex py-2">
              <div className="flex flex-col px-1">
                <label htmlFor="nombreUsuario" className="mt-4 font-medium">
                  País:
                </label>
                <input
                  id="nombreUsuario"
                  className={`border border-blue-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 w-48`}
                  value={usuario.pais}
                  onChange={(e) => handleEditableChange(e, "pais")}
                />
                <span className="text-red-500">{errorMessages.pais}</span>
              </div>
              <div className="flex flex-col px-1">
                <label htmlFor="telefono" className="mt-4 font-medium">
                  Teléfono:
                </label>
                <input
                  id="telefono"
                  className={`border border-blue-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 w-48`}
                  value={usuario.telefono}
                  onChange={(e) => handleEditableChange(e, "telefono")}
                />
                <span className="text-red-500">{errorMessages.telefono}</span>
              </div>
            </div>

            <label htmlFor="habilidad" className="mt-4 font-medium">
              Correo:
            </label>
            <input
              id="habilidad"
              className={`mt-2 border border-blue-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 w-auto`}
              value={usuario.email}
              onChange={(e) => handleEditableChange(e, "email")}
            />
            <span className="text-red-500">{errorMessages.email}</span>
          </div>
          <div className="py-2 justify-center items-center">
            <button
              className="w-24 md:w-32 font-gabarito mt-4 bg-blue-500 hover:bg-blue-800 text-white rounded-md p-2 transform              hover:scale-105 transition duration-300 ease-in-out"
              onClick={() => {
                if (validarCampos()) {
                  guardarCambios();
                }
              }}
            >
              Guardar
            </button>
          </div>
        </div>
      )}

      {mostrarContraseña && (
        <div className="justify-center items-center">
          <div className="flex flex-col">
            <label htmlFor="nuevaContraseña" className="mt-4 font-medium">
              Nueva Contraseña
            </label>
            <input
              type="password"
              placeholder="Nueva contraseña"
              className={`mt-2 border border-blue-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 w-48`}
            />

            <label htmlFor="confirmarContraseña" className="mt-4 font-medium">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              placeholder="Confirmar contraseña"
              className={`mt-2 border border-blue-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 w-48`}
              value={contrasena}
              onChange={handleContrasenaChange}
            />
          </div>
          <button
            className="w-30 md:w-32 font-gabarito mt-4 bg-blue-500 hover:bg-blue-800 text-white rounded-md p-2 transform hover:scale-105 transition duration-300 ease-in-out"
            onClick={guardarCambios}
          >
            Cambiar contraseña
          </button>
        </div>
      )}
    </div>
  );
}

EditarUsuarioAdmin.propTypes = {
  userEmail: PropTypes.string.isRequired,
};
