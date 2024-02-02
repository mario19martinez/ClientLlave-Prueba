// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
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
import PropTypes from "prop-types";

LoginForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default function LoginForm({ onClose }) {
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
          navigate("/estudiante/Escritorio");
          onClose(); // Cerrar el formulario después del inicio de sesión
        }

        // Actualizamos el estado de isLoggedIn después de la autenticación
        localStorage.setItem("isLoggedIn", isLoggedIn);
        window.location.reload();
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        formik.setFieldError("email", "Credenciales incorrectas");
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

  return (
    <div className="bg-blue-900 rounded-lg p-6 relative">
      <button
        className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={onClose}
      >
        X
      </button>
      <h2 className="text-2xl font-semibold text-white mb-4">Iniciar Sesión</h2>
      <h4 className="text-white text-lg mb-2">¡Hola, bienvenido de nuevo!</h4>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label className="text-white block">Correo electronico:</label>
          <input
            className="w-full p-2 rounded-md bg-blue-600 text-white"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-red-500 mt-1">{formik.errors.email}</p>
          ) : null}
        </div>
        <div className="mb-3">
          <label className="text-white block">Contraseña:</label>
          <input
            className="w-full p-2 rounded-md bg-blue-600 text-white"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="text-red-500 mt-1">{formik.errors.password}</p>
          ) : null}
        </div>
        <p className="text-white mb-2">¿Olvidaste tu contraseña?</p>
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          type="submit"
        >
          Acceder
        </button>
      </form>
      <p className="text-white mt-2">
        ¿No tienes una cuenta?{" "}
        <a href="#" className="text-blue-300">
          Regístrate ahora
        </a>
      </p>
    </div>
  );
}