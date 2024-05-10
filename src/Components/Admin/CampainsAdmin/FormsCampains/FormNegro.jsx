import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import paisesData from "../../../FormResgistro/Paises.json";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const initialValues = {
  name: "",
  last_name: "",
  identificacion: "",
  email: "",
  telefono: "",
  pais: "",
  privacyPolicy: false,
  dataTreatmentPolicy: false,
  campaña: "Campaña España",
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

export default function FormNegro() {
  const [fullPhoneNumber, setFullPhoneNumber] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

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
        toast.success(message);
        localStorage.setItem("token", token);
        navigate("/curso/2");
      } catch (error) {
        console.error("Error al registrar al usuario:", error);
        toast.error("Error al registrar el usuario.");
      }
    },
  });

  return (
    <div
      className="mx-auto w-full sm:w-4/5 md:w-3/5 lg:w-2/5 p-8 bg-white bg-opacity-80 shadow-md rounded-lg"
      style={{ position: "relative", zIndex: 2 }}
    >
      <h1 className="text-xl font-bold text-center mb-6">
        Regístrate ahora para obtener 10 Clases de Obsequio
      </h1>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.name}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block text-sm font-medium text-gray-700"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {formik.touched.last_name && formik.errors.last_name && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.last_name}
              </p>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="pais"
            className="block text-sm font-medium text-gray-700"
          >
            País:
          </label>
          <select
            id="pais"
            name="pais"
            onChange={(e) => {
              formik.handleChange(e);
              setSelectedCountryCode(
                paisesData.paises.find((pais) => pais.nombre === e.target.value)
                  .codigo_telefonico
              );
            }}
            onBlur={formik.handleBlur}
            value={formik.values.pais}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
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
            <p className="mt-1 text-sm text-red-600">{formik.errors.pais}</p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <label
              htmlFor="indicativo"
              className="block text-sm font-medium text-gray-700"
            >
              Indicativo:
            </label>
            <input
              type="text"
              id="indicativo"
              name="indicativo"
              value={selectedCountryCode}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="md:col-span-2">
            <label
              htmlFor="telefono"
              className="block text-sm font-medium text-gray-700"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {formik.touched.telefono && formik.errors.telefono && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.telefono}
              </p>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
          )}
        </div>
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="privacyPolicy"
              name="privacyPolicy"
              type="checkbox"
              checked={formik.values.privacyPolicy}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="privacyPolicy"
              className="font-medium text-gray-700"
            >
              Acepto la política de privacidad
            </label>
          </div>
          {formik.touched.privacyPolicy && formik.errors.privacyPolicy && (
            <p className="mt-1 text-sm text-red-600">
              {formik.errors.privacyPolicy}
            </p>
          )}
        </div>
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="dataTreatmentPolicy"
              name="dataTreatmentPolicy"
              type="checkbox"
              checked={formik.values.dataTreatmentPolicy}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="dataTreatmentPolicy"
              className="font-medium text-gray-700"
            >
              Acepto la política de tratamiento de datos
            </label>
          </div>
          {formik.touched.dataTreatmentPolicy &&
            formik.errors.dataTreatmentPolicy && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.dataTreatmentPolicy}
              </p>
            )}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-4 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            Registrarme
          </button>
        </div>
      </form>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{"Políticas no aceptadas"}</DialogTitle>
        <DialogContent>
          <p>Por favor, acepta las políticas para continuar.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}