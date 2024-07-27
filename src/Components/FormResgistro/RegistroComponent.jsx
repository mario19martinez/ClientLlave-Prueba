// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import paisesData from "./Paises.json";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  clearRegistrationStatus,
} from "../../Redux/features/Users/usersSlice.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import fondo from "../../assets/apostol_profeta.jpg";

const initialValues = {
  name: "",
  last_name: "",
  identificacion: "",
  email: "",
  contraseña: "",
  confirmPassword: "",
  telefono: "",
  pais: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es requerido"),
  last_name: Yup.string().required("El apellido es requerido"),
  email: Yup.string()
    .email("Ingresa un email válido")
    .required("El email es requerido"),
  contraseña: Yup.string()
    .required("La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("contraseña"), null], "Las contraseñas no coinciden")
    .required("Confirma la contraseña"),
  telefono: Yup.string().required("El teléfono es requerido"),
  pais: Yup.string().required("El país es requerido"),
});

const RegistroComponent = () => {
  const dispatch = useDispatch();
  const [fullPhoneNumber, setFullPhoneNumber] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const navigate = useNavigate();

  const NewUser = true;
  localStorage.setItem("NewUser", NewUser);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      values.telefono = `${selectedCountryCode} ${values.telefono}`;
      try {
        const response = await dispatch(registerUser(values));
        const { message } = response.payload;
        toast.success(message, {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: false,
          theme: "colored",
        });
        navigate("/login");
      } catch (error) {
        console.error("Error al registrar al usuario:", error);
        toast.error("Error al registrar el usuario.", {
          position: "top-center",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: false,
          theme: "colored",
        });
      }
    },
  });

  const registrationStatus = useSelector(
    (state) => state.users.registrationStatus
  );
  const error = useSelector((state) => state.users.error);

  useEffect(() => {
    if (registrationStatus === "succeeded") {
      dispatch(clearRegistrationStatus());
    } else if (registrationStatus === "failed") {
      console.error("Error al registrar al usuario:", error);
    }
  }, [registrationStatus, error, dispatch]);

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen relative"
      style={{
        backgroundImage: `url(${fondo})`,
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      
      <div className="flex flex-col items-center justify-center h-full relative z-10">
      <div className="flex justify-start py-3">
        <button
          onClick={handleGoBack}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
         <HomeIcon />
        </button>
      </div>
        <h1 className="text-3xl font-semibold mb-6 text-center text-blue-100">
          Registro de usuario
        </h1>
        <form
          onSubmit={formik.handleSubmit}
          className="max-w-md mx-auto bg-black bg-opacity-50 p-8 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Nombre:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="form-input mt-1 block w-full border border-blue-500 rounded-md focus:outline-none focus:border-blue-800"
            />
            {formik.touched.name && formik.errors.name ? (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
            ) : null}
          </div>

          <div className="mb-4">
            <label
              htmlFor="last_name"
              className="block text-sm font-medium text-white"
            >
              Apellido:
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.last_name}
              className="form-input mt-1 block w-full border border-blue-400 rounded-md focus:outline-none focus:border-blue-500"
            />
            {formik.touched.last_name && formik.errors.last_name ? (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.last_name}
              </p>
            ) : null}
          </div>

          <div className="mb-4">
            <label
              htmlFor="pais"
              className="block text-sm font-medium text-white"
            >
              País:
            </label>
            <select
              id="pais"
              name="pais"
              onChange={(e) => {
                formik.handleChange(e);
                setSelectedCountryCode(
                  paisesData.paises.find(
                    (pais) => pais.nombre === e.target.value
                  ).codigo_telefonico
                );
              }}
              onBlur={formik.handleBlur}
              value={formik.values.pais}
              className="form-select mt-1 block w-full border border-blue-400 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="" disabled>
                Seleccione país
              </option>
              {paisesData.paises.map((pais) => (
                <option key={pais.nombre} value={pais.nombre}>
                  {pais.nombre}
                </option>
              ))}
            </select>
            {formik.touched.pais && formik.errors.pais ? (
              <p className="text-red-500 text-sm mt-1">{formik.errors.pais}</p>
            ) : null}
          </div>

          <div className="flex mb-4">
            <div className="flex-1 pr-2 w-1/2">
              <label
                htmlFor="indicativo"
                className="block text-sm font-medium text-white"
              >
                Indicativo:
              </label>
              <input
                type="text"
                id="indicativo"
                name="indicativo"
                value={selectedCountryCode}
                readOnly
                className="form-input mt-1 block w-full border border-blue-400 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex-1 pl-2">
              <label
                htmlFor="telefono"
                className="block text-sm font-medium text-white"
              >
                Teléfono:
              </label>
              <input
                type="text"
                id="telefono"
                name="telefono"
                onChange={(e) => {
                  formik.handleChange(e);
                  setFullPhoneNumber(e.target.value);
                }}
                onBlur={formik.handleBlur}
                value={fullPhoneNumber}
                className="form-input mt-1 block w-full border border-blue-400 rounded-md focus:outline-none focus:border-blue-500"
              />
              {formik.touched.telefono && formik.errors.telefono ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.telefono}
                </p>
              ) : null}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="form-input mt-1 block w-full border border-blue-400 rounded-md focus:outline-none focus:border-blue-500"
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            ) : null}
          </div>

          <div className="mb-4">
            <label
              htmlFor="contraseña"
              className="block text-sm font-medium text-white"
            >
              Contraseña:
            </label>
            <input
              type="password"
              id="contraseña"
              name="contraseña"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.contraseña}
              className="form-input mt-1 block w-full border border-blue-400 rounded-md focus:outline-none focus:border-blue-500"
            />
            {formik.touched.contraseña && formik.errors.contraseña ? (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.contraseña}
              </p>
            ) : null}
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-white"
            >
              Confirmar Contraseña:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className="form-input mt-1 block w-full border border-blue-400 rounded-md focus:outline-none focus:border-blue-500"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.confirmPassword}
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Regístrate
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistroComponent;
