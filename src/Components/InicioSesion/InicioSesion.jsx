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
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

LoginForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default function LoginForm({ onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
      setIsLoading(true);
      try {
        const userDataResponse = await dispatch(getUserData(values.email));
        const userRole = userDataResponse.payload?.rol || "";

        let isLoggedIn = "false";

        if (
          values.email === VITE_ADMIN_EMAIL &&
          values.password === VITE_ADMIN_PASSWORD
        ) {
          isLoggedIn = "true";
          localStorage.setItem("SuperAdmin", "true");
          localStorage.setItem("userRole", "SuperAdmin");
          navigate("/admin");
        } else {
          const token = await dispatch(loginUser(values)).unwrap();
          isLoggedIn = "true";
          localStorage.setItem("token", token);
          localStorage.setItem("email", values.email);
          localStorage.setItem("userRole", userRole);

          switch (userRole) {
            case "admin":
              navigate("/admin");
              break;
            case "editor":
              navigate("/Editor");
              break;
            case "monitor":
              navigate("/Monitor");
              break;
            default:
              navigate("/estudiante/Escritorio");
              onClose();
          }
        }

        localStorage.setItem("isLoggedIn", isLoggedIn);
        window.location.reload();
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        if (error.response?.status === 403) {
          formik.setFieldError("email", "Usuario baneado");
          alert("Usuario baneado. Contacta al soporte");
        } else {
          formik.setFieldError("email", "Credenciales incorrectas");
          formik.setFieldError("password", "Credenciales incorrectas");
        }
      } finally {
        setIsLoading(false);
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
          {/* Email */}
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
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-white block mb-1">Contraseña:</label>
            <div className="flex items-center bg-blue-600 rounded-md p-2 relative">
              <FaLock className="text-white mr-2" />
              <input
                className="w-full bg-transparent text-white focus:outline-none pr-8"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Ingresa tu contraseña"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 text-white text-lg focus:outline-none"
                tabIndex={-1}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 mt-1">{formik.errors.password}</p>
            )}
          </div>

          {/* Extra Links and Submit */}
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