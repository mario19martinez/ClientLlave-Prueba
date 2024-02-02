// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
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
  //identificacion: Yup.string().required("La identificación es requerida"),
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

const RegistrationModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [fullPhoneNumber, setFullPhoneNumber] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      values.telefono = `${selectedCountryCode} ${values.telefono}`;
      try {
        const response = await dispatch(registerUser(values));
        const { token, message } = response.payload;

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("email", values.email);
        //localStorage.setItem("token", token);
        onClose();

        toast.success(message, {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: false,
          theme: "colored",
        });
        console.log('Este es el token',token);
        localStorage.setItem("token", token);
        navigate("/estudiante/Escritorio");
        window.location.reload();
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

  return (
    <div
      className={`fixed ${isOpen ? "block" : "hidden"} inset-0 overflow-y-auto`}
    >
      <div className="flex items-center justify-center min-h-screen p-4 text-center">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-blue-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
          <form onSubmit={formik.handleSubmit} className="p-6">
            <h1 className="text-2xl font-semibold mb-4 text-white">Registro</h1>
            <div className="mb-3">
              <label htmlFor="name" className="text-white">
                Nombre:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="w-full p-2 rounded-md bg-blue-600 text-white"
              />
              {formik.touched.name && formik.errors.name ? (
                <p className="text-red-500 mt-1">{formik.errors.name}</p>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="last_name" className="text-white">
                Apellido:
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.last_name}
                className="w-full p-2 rounded-md bg-blue-600 text-white"
              />
              {formik.touched.last_name && formik.errors.last_name ? (
                <p className="text-red-500 mt-1">{formik.errors.last_name}</p>
              ) : null}
            </div>

            {/* <div className="mb-3">
              <label htmlFor="identificacion" className="text-white">
                No. Identificación:
              </label>
              <input
                type="text"
                id="identificacion"
                name="identificacion"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.identificacion}
                className="w-full p-2 rounded-md bg-blue-600 text-white"
              />
              {formik.touched.identificacion && formik.errors.identificacion ? (
                <p className="text-red-500 mt-1">
                  {formik.errors.identificacion}
                </p>
              ) : null}
            </div> */}

            <div className="mb-3">
              <label htmlFor="pais" className="text-white">
                País:
              </label>
              <select
                id="pais"
                name="pais"
                onChange={(e) => {
                  formik.handleChange(e);
                  // Guarda el código de país seleccionado
                  setSelectedCountryCode(
                    paisesData.paises.find(
                      (pais) => pais.nombre === e.target.value
                    ).codigo_telefonico
                  );
                }}
                onBlur={formik.handleBlur}
                value={formik.values.pais}
                className="w-full p-2 rounded-md bg-blue-600 text-white"
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
                <p className="text-red-500 mt-1">{formik.errors.pais}</p>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="telefono" className="text-white">
                Teléfono:
              </label>
              <div className="flex items-center">
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
                  className="w-full p-2 rounded-md bg-blue-600 text-white"
                />
                {formik.touched.telefono && formik.errors.telefono ? (
                  <p className="text-red-500 mt-1">{formik.errors.telefono}</p>
                ) : null}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="text-white">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="w-full p-2 rounded-md bg-blue-600 text-white"
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500 mt-1">{formik.errors.email}</p>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="contraseña" className="text-white">
                Contraseña:
              </label>
              <input
                type="password"
                id="contraseña"
                name="contraseña"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.contraseña}
                className="w-full p-2 rounded-md bg-blue-600 text-white"
              />
              {formik.touched.contraseña && formik.errors.contraseña ? (
                <p className="text-red-500 mt-1">{formik.errors.contraseña}</p>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="text-white">
                Confirmar Contraseña:
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className="w-full p-2 rounded-md bg-blue-600 text-white"
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <p className="text-red-500 mt-1">
                  {formik.errors.confirmPassword}
                </p>
              ) : null}
            </div>

            <button
              type="button"
              className="absolute top-2 right-2 bg-blue-600 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={onClose}
            >
              X
            </button>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover-bg-blue-600"
            >
              Regístrate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

RegistrationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RegistrationModal;
