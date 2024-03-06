// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser, clearRegistrationStatus, getUserData } from "../../Redux/features/Users/usersSlice";
import { toast } from "react-toastify";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { VITE_ADMIN_EMAIL, VITE_ADMIN_PASSWORD } = import.meta.env;

  useEffect(() => {
    dispatch(clearRegistrationStatus());
  }, [dispatch]);

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
          navigate("/admin");
        } else if (userRole === "admin") {
          // Iniciar sesión para el rol de administrador
          const token = await dispatch(loginUser(values)).unwrap();
          isLoggedIn = "true";
          localStorage.setItem("token", token);
          localStorage.setItem("email", values.email);
          navigate("/admin");
        } else {
          // Iniciar sesión para otros roles (asumiendo "client")
          const token = await dispatch(loginUser(values)).unwrap();
          isLoggedIn = "true";
          localStorage.setItem("token", token);
          localStorage.setItem("email", values.email);
          //navigate("/estudiante/Escritorio");
          navigate("/estudiante/cursosInscritos");
        }

        // Actualizamos el estado de isLoggedIn después de la autenticación
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
      }
    },
  });

  const handleGoBack = () => {
    navigate("/");
  };

  const handleRegistration = () => {
    navigate("/RegistroUser");
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url('https://llaveparalasnaciones.online/wp-content/uploads/2023/09/28-2-scaled.jpg')` }}>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="flex flex-col items-center justify-center h-full relative z-10 pt-10">
        <button
          onClick={handleGoBack}
          className="absolute top-0 left-0 mt-4 ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Atrás
        </button>

        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-md">
          <h2 className="text-4xl font-semibold mb-6 text-center text-white">Iniciar Sesión</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium text-white">Correo electrónico</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-2 block w-full rounded-lg bg-white border-transparent focus:border-blue-500 focus:bg-gray-100 focus:ring-0 text-gray-900 py-3 px-4 text-lg"
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            ) : null}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-lg font-medium text-white">Contraseña</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-2 block w-full rounded-lg bg-white border-transparent focus:border-blue-500 focus:bg-gray-100 focus:ring-0 text-gray-900 py-3 px-4 text-lg"
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
            ) : null}
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-white">¿Olvidaste tu contraseña?</p>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
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
