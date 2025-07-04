import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  loginUser,
  clearRegistrationStatus,
  getUserData,
} from "../../Redux/features/Users/usersSlice";
import { toast } from "react-toastify";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import fondo from "../../assets/apostol_profeta.jpg";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const { VITE_ADMIN_EMAIL, VITE_ADMIN_PASSWORD } = import.meta.env;

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    dispatch(clearRegistrationStatus());
    const isNewUser = localStorage.getItem("NewUser");
    if (isNewUser === "true") {
      setShowModal(true);
      localStorage.removeItem("NewUser");
    }
  }, [dispatch]);

  const handleCloseModal = () => setShowModal(false);
  const handleGoBack = () => navigate("/");
  const handleRegistration = () => navigate("/RegistroUser");

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Ingrese un correo válido")
      .required("El correo es requerido"),
    password: Yup.string().required("La contraseña es requerida"),
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

        // if (
        //   values.email === VITE_ADMIN_EMAIL &&
        //   values.password === VITE_ADMIN_PASSWORD
        // // ) {
        //   isLoggedIn = "true";
        //   localStorage.setItem("SuperAdmin", "true");
        //   localStorage.setItem("userRole", "SuperAdmin");
        //   navigate("/admin");
        // } else {
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
          }
        //}

        localStorage.setItem("isLoggedIn", isLoggedIn);
        window.location.reload();
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        toast.error("Error al iniciar sesión. Verifica tus datos", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: false,
          theme: "colored",
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

      <div className="flex flex-col items-center justify-center h-full relative z-10 pt-10 px-4 md:px-0">
        {/* Modal de nuevo usuario */}
        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full px-1 flex items-center justify-center z-50">
            <div className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-50"></div>
            <div className="relative bg-white rounded-lg p-8 z-10 max-w-md mx-auto">
              <p className="text-lg text-center mb-4">
                Ahora inicia sesión con el correo y la contraseña que
                proporcionaste durante el registro.
              </p>
              <button
                onClick={handleCloseModal}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 block mx-auto"
              >
                Aceptar
              </button>
            </div>
          </div>
        )}

        {isLoading && <LoadingSpinner />}

        {/* Botón volver */}
        <div className="flex justify-center py-3 w-full">
          <button
            onClick={handleGoBack}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <HomeIcon />
          </button>
        </div>

        {/* Formulario */}
        <form
          onSubmit={formik.handleSubmit}
          className="max-w-md w-full bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-md"
        >
          <h2 className="text-4xl font-semibold mb-6 text-center text-white">
            Iniciar Sesión
          </h2>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-lg font-medium text-white"
            >
              Correo electrónico
            </label>
            <div className="relative mt-2">
              <EmailIcon className="absolute left-3 top-3 text-gray-400" />
              <input
                id="email"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="pl-10 w-full rounded-lg bg-white text-gray-900 py-3 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Contraseña con toggle */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-lg font-medium text-white"
            >
              Contraseña
            </label>
            <div className="relative mt-2">
              <LockIcon className="absolute left-3 top-3 text-gray-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="pl-10 pr-10 w-full rounded-lg bg-white text-gray-900 py-3 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-3 text-gray-600 text-xl"
                tabIndex={-1}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>

          {/* Submit y links */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-white">¿Olvidaste tu contraseña?</p>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Acceder
            </button>
          </div>

          <p className="text-center text-white">
            ¿No tienes una cuenta?{" "}
            <button
              onClick={handleRegistration}
              className="underline focus:outline-none transition duration-300"
            >
              Regístrate ahora
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}