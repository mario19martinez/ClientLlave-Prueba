// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserData,
  updateUser,
} from "../../../Redux/features/Users/usersSlice";
import UploadWidget from "../../UploadWidget/UploadWidget";

function AjustesAdmin() {
  const [mostrarPerfil, setMostrarPerfil] = useState(true);
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [contrasena, setContrasena] = useState("");

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
    if (storedEmail) {
      dispatch(getUserData(storedEmail));
    }
  }, [dispatch, storedEmail]);

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
    const valor = e.target.innerText;

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

    if (usuario.email.trim() === "") {
      errorMessagesCopy.email = "El campo Correo no debe estar vacío";
      isValid = false;
    } else {
      errorMessagesCopy.email = "";
    }

    // Validación de correo electrónico
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailPattern.test(usuario.email)) {
      errorMessagesCopy.email = "Correo no válido";
      isValid = false;
    }

    setErrorMessages(errorMessagesCopy);
    return isValid;
  };

  const handleContrasenaChange = (e) => {
    setContrasena(e.target.value);
  };

  const guardarCambios = () => {
    const usuarioActualizado = {
      ...usuario,
      contraseña: contrasena,
    };
    console.log(usuarioActualizado);

    dispatch(
      updateUser({ id: userData.identificacion, userData: usuarioActualizado })
    );
    window.location.reload();
  };

  useEffect(() => {
    setMostrarPerfil(true);
  }, []);

  if (!storedEmail) {
    return (
      <div className="h-auto md:w-1/2 mx-auto mt-6 p-4">
        <h1 className="text-center text-gray-700 text-xl">
          El usuario no necesita ajustes.
        </h1>
      </div>
    );
  }

  return (
    <div className="h-auto md:w-1/2 mx-auto mt-6 p-4">
      <div className="flex flex-col lg:flex-row items-center justify-center space-y-4 lg:space-y-0 lg:space-x-4">
        <button
          className={`mx-2 md:mx-4 px-4 py-2 rounded-md text-lg border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 ${
            mostrarPerfil
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-blue-700 hover:text-white transform hover:scale-105 transition duration-300 ease-in-out`}
          onClick={() => handleBotonClick("perfil")}
        >
          Perfil
        </button>
        <button
          className={`mx-2 md:mx-4 px-4 py-2 rounded-md text-lg border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 ${
            mostrarContraseña
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-blue-700 hover:text-white transform hover:scale-105 transition duration-300 ease-in-out`}
          onClick={() => handleBotonClick("contraseña")}
        >
          Contraseña
        </button>
      </div>

      {mostrarPerfil && (
        <div className="mt-4 lg:pl-8">
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

            <label htmlFor="nombre" className="font-medium">
              Nombre
            </label>
            <div
              id="nombre"
              className="mt-2 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 w-48"
              contentEditable={true}
              onBlur={(e) => handleEditableChange(e, "name")}
              dangerouslySetInnerHTML={{ __html: usuario.name }}
            ></div>
            <span className="text-red-500">{errorMessages.name}</span>

            <label htmlFor="apellido" className="font-medium">
              Apellido
            </label>
            <div
              id="apellido"
              className="mt-2 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 w-48"
              contentEditable={true}
              onBlur={(e) => handleEditableChange(e, "last_name")}
              dangerouslySetInnerHTML={{ __html: usuario.last_name }}
            ></div>
            <span className="text-red-500">{errorMessages.last_name}</span>

            <label htmlFor="nombreUsuario" className="font-medium">
              País
            </label>
            <div
              id="nombreUsuario"
              className="mt-2 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 w-48"
              contentEditable={true}
              onBlur={(e) => handleEditableChange(e, "pais")}
              dangerouslySetInnerHTML={{ __html: usuario.pais }}
            ></div>
            <span className="text-red-500">{errorMessages.pais}</span>

            <label htmlFor="telefono" className="font-medium">
              Teléfono
            </label>
            <div
              id="telefono"
              className="mt-2 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 w-48"
              contentEditable={true}
              onBlur={(e) => handleEditableChange(e, "telefono")}
              dangerouslySetInnerHTML={{ __html: usuario.telefono }}
            ></div>
            <span className="text-red-500">{errorMessages.telefono}</span>

            <label htmlFor="habilidad" className="font-medium">
              Correo
            </label>
            <div
              id="habilidad"
              className="mt-2 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 w-48"
              contentEditable={true}
              onBlur={(e) => handleEditableChange(e, "email")}
              dangerouslySetInnerHTML={{ __html: usuario.email }}
            ></div>
            <span className="text-red-500">{errorMessages.email}</span>

            <button
              className="w-24 md:w-32 font-medium md:translate-x-6 bg-blue-500 hover:bg-blue-800 text-white rounded-md p-2 transform hover:scale-105 transition duration-300 ease-in-out"
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
        <div className="mt-4 lg:pl-8">
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
            className="w-30 md:w-32 font-gabarito md:translate-x-0 mt-4 bg-blue-500 hover-bg-blue-800 text-white rounded-md p-2 transform hover:scale-105 transition duration-300 ease-in-out"
            onClick={guardarCambios}
          >
            Cambiar contraseña
          </button>
        </div>
      )}
    </div>
  );
}

export default AjustesAdmin;
