import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  loginUser,
  clearRegistrationStatus,
  getUserData,
} from "../../Redux/features/Users/usersSlice";
import PropTypes from "prop-types";
import { FaEnvelope, FaLock } from "react-icons/fa";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"; 

LoginForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default function LoginForm({ onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { VITE_ADMIN_EMAIL, VITE_ADMIN_PASSWORD } = import.meta.env;

  useEffect(() => {
    dispatch(clearRegistrationStatus());
  }, [dispatch]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Ingresa un correo válido")
      .required("Correo es requerido"),
    password: Yup.string().required("Contraseña es requerida"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true); // Mostrar spinner de carga
      try {
        const userDataResponse = await dispatch(getUserData(values.email));
        const userRole = userDataResponse.payload?.rol || "";

        let isLoggedIn = "false"; // Inicializamos como no autenticado

        if (
          values.email === VITE_ADMIN_EMAIL &&
          values.password === VITE_ADMIN_PASSWORD
        ) {
          // Manejar el inicio de sesión del SuperAdmin
          isLoggedIn = "true";
          localStorage.setItem("SuperAdmin", "true");
          localStorage.setItem("userRole", "SuperAdmin");
          navigate("/admin");
        } else if (userRole === "admin") {
          // Iniciar sesión para el rol de administrador
          const token = await dispatch(loginUser(values)).unwrap();
          isLoggedIn = "true";
          localStorage.setItem("token", token);
          localStorage.setItem("email", values.email);
          localStorage.setItem("userRole", userRole);
          navigate("/admin");
        } else if (userRole === "editor") {
          // Iniciar sesión para el rol de editor
          const token = await dispatch(loginUser(values)).unwrap();
          isLoggedIn = "true";
          localStorage.setItem("token", token);
          localStorage.setItem("email", values.email);
          localStorage.setItem("userRole", userRole);
          navigate("/Editor");
        } else if (userRole === "monitor") {
          // Iniciar sesión para el rol de monitor
          const token = await dispatch(loginUser(values)).unwrap();
          isLoggedIn = "true";
          localStorage.setItem("token", token);
          localStorage.setItem("email", values.email);
          localStorage.setItem("userRole", userRole);
          navigate("/Monitor");
        } else {
          // Iniciar sesión para otros roles (asumiendo "client")
          const token = await dispatch(loginUser(values)).unwrap();
          isLoggedIn = "true";
          localStorage.setItem("token", token);
          localStorage.setItem("email", values.email);
          localStorage.setItem("userRole", userRole);
          navigate("/estudiante/Escritorio");
          onClose(); // Cerrar el formulario después del inicio de sesión
        }

        // Actualizamos el estado de isLoggedIn después de la autenticación
        localStorage.setItem("isLoggedIn", isLoggedIn);
        window.location.reload();
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        if (error.response && error.response.status === 403) {
          formik.setFieldError("email", "Usuario baneado");
          alert("Usuario baneado. Contacta al soporte");
        } else {
          formik.setFieldError("email", "Credenciales incorrectas");
          formik.setFieldError("password", "Credenciales incorrectas");
        }
      } finally {
        setIsLoading(false); // Ocultar spinner de carga
      }
    },
  });

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="bg-blue-900 rounded-lg p-8 relative shadow-lg">
        <button
          className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
          onClick={onClose}
        >
          X
        </button>
        <h2 className="text-3xl font-semibold text-white mb-4">Iniciar Sesión</h2>
        <h4 className="text-white text-lg mb-6">¡Hola, bienvenido de nuevo!</h4>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="relative">
            <label className="text-white block mb-1">Correo electrónico:</label>
            <div className="flex items-center bg-blue-600 rounded-md p-2">
              <FaEnvelope className="text-white mr-2" />
              <input
                className="w-full bg-transparent text-white focus:outline-none"
                type="email"
                name="email"
                placeholder="Ingresa tu correo"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500 mt-1">{formik.errors.email}</p>
            ) : null}
          </div>
          <div className="relative">
            <label className="text-white block mb-1">Contraseña:</label>
            <div className="flex items-center bg-blue-600 rounded-md p-2">
              <FaLock className="text-white mr-2" />
              <input
                className="w-full bg-transparent text-white focus:outline-none"
                type="password"
                name="password"
                placeholder="Ingresa tu contraseña"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500 mt-1">{formik.errors.password}</p>
            ) : null}
          </div>
          <p className="text-white mb-4">¿Olvidaste tu contraseña?</p>
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            type="submit"
          >
            Acceder
          </button>
        </form>
        <p className="text-white mt-4">
          ¿No tienes una cuenta?{" "}
          <a href="#" className="text-blue-300 hover:underline">
            Regístrate ahora
          </a>
        </p>
      </div>
    </>
  );
}