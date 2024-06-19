import { useState, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import paisesData from "../FormResgistro/Paises.json";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/fondo.png";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const initialValues = {
  name: "",
  last_name: "",
  identificacion: "",
  email: "",
  telefono: "",
  pais: "",
  privacyPolicy: false,
  dataTreatmentPolicy: false,
  campaña: "Pagina Inicio",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es requerido"),
  last_name: Yup.string().required("El apellido es requerido"),
  email: Yup.string()
    .email("Ingresa un email válido")
    .required("El email es requerido"),
  telefono: Yup.string().required("El teléfono es requerido"),
  pais: Yup.string().required("El país es requerido"),
  privacyPolicy: Yup.boolean().oneOf(
    [true],
    "Debes aceptar la política de privacidad"
  ),
  dataTreatmentPolicy: Yup.boolean().oneOf(
    [true],
    "Debes aceptar la política de tratamiento de datos"
  ),
});

export default function LandingPage() {
  const [fullPhoneNumber, setFullPhoneNumber] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      values.telefono = `${selectedCountryCode} ${values.telefono}`;
      if (!values.privacyPolicy || !values.dataTreatmentPolicy) {
        setOpenDialog(true);
        return;
      }
      try {
        const response = await axios.post("/useriniciado", values);
        const { token, message } = response.data;
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("email", values.email);
        toast.success(message, {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: false,
          theme: "colored",
        });
        localStorage.setItem("token", token);
        navigate("/curso/2");
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

  return (
    <div
      className="flex flex-col justify-center items-center bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full max-w-4xl px-4 pt-5 pb-5 text-center">
        <div className="mb-8">
          <h2
            className="text-2xl md:text-3xl font-bold text-white mb-8 hover:text-yellow-400 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
            style={{ textShadow: "0 0 5px black" }}
          >
            No te pierdas esta oportunidad de avanzar
            <br />
            hacia el cumplimiento de tus sueños y metas.
          </h2>
        </div>
        <div className="mb-8">
          {isLoggedIn ? (
            <button
              onClick={() => navigate("/cuenta")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Ir a la cuenta
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4 focus:outline-none focus:shadow-outline"
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Regístrate
              </button>
            </>
          )}
        </div>
      </div>
      <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {"Formulario de Registro"}
          <IconButton
            aria-label="close"
            onClick={() => setShowModal(false)}
            style={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit} className="w-full md:w-auto bg-gray-100 p-6 rounded-lg shadow-md">
            <h1 className="text-2xl md:text-3xl font-bold text-black mb-6 text-center">
              Regístrate Ahora para obtener 10 Clases de Obsequio
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="name" className="block text-black">
                  Nombre:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className="form-input mt-1 block w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 text-black"
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.name}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="last_name" className="block text-black">
                  Apellido:
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.last_name}
                  className="form-input mt-1 block w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 text-black"
                />
                {formik.touched.last_name && formik.errors.last_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.last_name}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="pais" className="block text-black">
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
                className="form-select mt-1 block w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 text-black"
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
              {formik.touched.pais && formik.errors.pais && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.pais}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="indicativo" className="block text-black">
                  Indicativo:
                </label>
                <input
                  type="text"
                  id="indicativo"
                  name="indicativo"
                  value={selectedCountryCode}
                  readOnly
                  className="form-input mt-1 block w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 text-black"
                />
              </div>
              <div>
                <label htmlFor="telefono" className="block text-black">
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
                  className="form-input mt-1 block w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 text-black"
                />
                {formik.touched.telefono && formik.errors.telefono && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.telefono}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-black">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="form-input mt-1 block w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 text-black"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>
            <div className="mb-4">
              {formik.touched.privacyPolicy && !formik.values.privacyPolicy && (
                <p className="text-red-500 text-sm mt-1">
                  Debes aceptar las políticas de privacidad
                </p>
              )}
              <div className="mb-4">
                <div className="flex items-center text-black">
                  <input
                    type="checkbox"
                    name="privacyPolicy"
                    checked={formik.values.privacyPolicy}
                    onChange={(e) =>
                      formik.setFieldValue("privacyPolicy", e.target.checked)
                    }
                    onBlur={formik.handleBlur}
                    className="mr-2"
                  />
                  <span className="pr-1">
                    He leído y acepto las{" "}
                    <a
                      href="/PoliticasPrivacidad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      políticas de privacidad
                    </a>
                  </span>
                </div>
                {formik.touched.privacyPolicy &&
                  !formik.values.privacyPolicy && (
                    <p className="text-red-500 text-sm mt-1">
                      Debes aceptar las políticas de privacidad
                    </p>
                  )}
              </div>
              <div className="flex items-center text-black mt-2">
                <input
                  type="checkbox"
                  name="dataTreatmentPolicy"
                  checked={formik.values.dataTreatmentPolicy}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "dataTreatmentPolicy",
                      e.target.checked
                    )
                  }
                  onBlur={formik.handleBlur}
                  className="mr-2"
                />
                <span className="pr-1">
                  He leído y acepto las políticas de{" "}
                  <a
                    href="/TratamientoDeDatos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    tratamiento de datos
                  </a>
                </span>
              </div>
              {formik.touched.dataTreatmentPolicy &&
                !formik.values.dataTreatmentPolicy && (
                  <p className="text-red-500 text-sm mt-1">
                    Debes aceptar las políticas de tratamiento de datos
                  </p>
                )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={
                !formik.isValid ||
                !formik.values.privacyPolicy ||
                !formik.values.dataTreatmentPolicy
              }
            >
              Regístrate
            </button>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{"Aviso"}</DialogTitle>
        <DialogContent>
          <p>
            Debe aceptar las políticas de privacidad y tratamiento de datos para
            continuar.
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Entendido
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}