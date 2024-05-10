import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import paisesData from "../FormResgistro/Paises.json";
import fondo from "../../assets/apostol_profeta.jpg";
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
  whatsApp: "",
  pais: "",
  tipo_documento: "",
  iglesia: "",
  pastor: "",
  ministerio: "",
  pastorea: "",
  autorizacion_pastor: "",
  ejerce_ministerio: "",
  miembros: "",
  fecha_nacimiento: "",
  direccion: "",
  privacyPolicy: false,
  dataTreatmentPolicy: false,
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es requerido"),
  last_name: Yup.string().required("El apellido es requerido"),
  identificacion: Yup.string().required("La identificación es requerida"),
  email: Yup.string()
    .email("Ingresa un email válido")
    .required("El email es requerido"),
  whatsApp: Yup.string().required("El teléfono es requerido"),
  pais: Yup.string().required("El país es requerido"),
  tipo_documento: Yup.string().required("El tipo de documento es requerido"),
  iglesia: Yup.string().required("La iglesia es requerida"),
  pastor: Yup.string().required("El nombre del pastor es requerido"),
  ministerio: Yup.string().required("El ministerio personal es requerido"),
  pastorea: Yup.string().required("Este campo es requerido"),
  autorizacion_pastor: Yup.string().required("Este campo es requerido"),
  ejerce_ministerio: Yup.string().required("Este campo es requerido"),
  miembros: Yup.string().required("Este campo es requerido"),
  fecha_nacimiento: Yup.string().required(
    "La fecha de nacimiento es requerida"
  ),
  direccion: Yup.string().required("La dirección es requerida"),
  privacyPolicy: Yup.boolean().oneOf(
    [true],
    "Debes aceptar la política de privacidad"
  ),
  dataTreatmentPolicy: Yup.boolean().oneOf(
    [true],
    "Debes aceptar la política de tratamiento de datos"
  ),
});

export default function FormUsersDataLegal() {
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [tipoDocumentoOptions, setTipoDocumentoOptions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      values.whatsApp = `${selectedCountryCode} ${values.whatsApp}`;
      if (!values.privacyPolicy || !values.dataTreatmentPolicy) {
        setOpenDialog(true);
        return;
      }
      try {
        console.log("Enviando datos:", values);
        const response = await axios.post("/datos", values);
        console.log("Datos de usuario recibidos:", response.data);
        console.log("El post se realizó con éxito");
        navigate("/");
      } catch (error) {
        console.error("Error al registrar los datos:", error);
        toast.error("Error al registrar los datos.");
      }
    },
  });

  const updateTipoDocumentoOptions = (countryName) => {
    const country = paisesData.paises.find(
      (pais) => pais.nombre === countryName
    );
    if (country) {
      setTipoDocumentoOptions(country.tipo_documento);
    } else {
      setTipoDocumentoOptions([]);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* Capa con color de fondo semitransparente */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Ajusta la opacidad aquí
          zIndex: 1,
        }}
      ></div>
      {/* Imagen de fondo */}
      <img
        src={fondo}
        alt="Fondo"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      />
      {/* Contenido del formulario */}
      <div
        className="mx-auto w-full sm:w-4/5 md:w-3/5 lg:w-2/4 p-8 bg-white bg-opacity-80 shadow-md rounded-lg"
        style={{ position: "relative", zIndex: 2 }}
      >
        <h1 className="text-xl font-bold text-center mb-6">
          FORMULARIO DE REGISTRO
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
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.name}
                </p>
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
                  paisesData.paises.find(
                    (pais) => pais.nombre === e.target.value
                  ).codigo_telefonico
                );
                // Llamar a la función para actualizar las opciones del tipo de documento
                updateTipoDocumentoOptions(e.target.value);
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="tipo_documento"
              className="block text-sm font-medium text-gray-700"
            >
              Tipo de documento de identidad:
            </label>
            <select
              id="tipo_documento"
              name="tipo_documento"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tipo_documento}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="" disabled>
                Seleccione un tipo de documento
              </option>
              {tipoDocumentoOptions.map((documento) => (
                <option key={documento} value={documento}>
                  {documento}
                </option>
              ))}
            </select>
            {formik.touched.tipo_documento && formik.errors.tipo_documento && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.tipo_documento}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="identificacion"
              className="block text-sm font-medium text-gray-700"
            >
              Numero de documento de identidad:
            </label>
            <input
              type="text"
              id="identificacion"
              name="identificacion"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.identificacion}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {formik.touched.identificacion && formik.errors.identificacion && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.identificacion}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div>
              <label
                htmlFor="whatsApp"
                className="block text-sm font-medium text-gray-700"
              >
                Teléfono:
              </label>
              <input
                type="text"
                id="whatsApp"
                name="whatsApp"
                onChange={(e) => {
                  const re = /^[0-9\b]+$/;
                  if (e.target.value === "" || re.test(e.target.value)) {
                    formik.handleChange(e);
                  }
                }}
                onBlur={formik.handleBlur}
                value={formik.values.whatsApp}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {formik.touched.whatsApp && formik.errors.whatsApp && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.whatsApp}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="fecha_nacimiento"
              className="block text-sm font-medium text-gray-700"
            >
              Fecha de Nacimiento:
            </label>
            <input
              type="date"
              id="fecha_nacimiento"
              name="fecha_nacimiento"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fecha_nacimiento}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {formik.touched.fecha_nacimiento &&
              formik.errors.fecha_nacimiento && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.fecha_nacimiento}
                </p>
              )}
          </div>
          <div>
            <label
              htmlFor="direccion"
              className="block text-sm font-medium text-gray-700"
            >
              Dirección:
            </label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.direccion}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {formik.touched.direccion && formik.errors.direccion && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.direccion}
              </p>
            )}
          </div>
         
          <div>
            <label
              htmlFor="iglesia"
              className="block text-sm font-medium text-gray-700"
            >
              Iglesia donde se congrega:
            </label>
            <input
              type="text"
              id="iglesia"
              name="iglesia"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.iglesia}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {formik.touched.iglesia && formik.errors.iglesia && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.iglesia}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="pastor"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre de su pastor:
            </label>
            <input
              type="text"
              id="pastor"
              name="pastor"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.pastor}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {formik.touched.pastor && formik.errors.pastor && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.pastor}
              </p>
            )}
          </div>
         
          <div >
            <label className="block text-sm font-medium text-gray-700">
              ¿Tiene la autorización de su pastor para ser parte del
              Entrenamiento Profético?:
            </label>
            <div className="flex items-center w-full">
              <input
                type="radio"
                id="autorizacionSi"
                name="autorizacion_pastor"
                value="si"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <label
                htmlFor="autorizacionSi"
                className="ml-2 mr-8 text-sm text-gray-700"
              >
                Sí
              </label>
              <input
                type="radio"
                id="autorizacionNo"
                name="autorizacion_pastor"
                value="no"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <label
                htmlFor="autorizacionNo"
                className="ml-2 text-sm text-gray-700"
              >
                No
              </label>
             <div className="flex px-10 items-center ">
             <label
                htmlFor="autorizacionNo"
                className="ml-2 text-sm text-gray-700"
              >
                ¿Por que?
              </label>
              <input
                type="text"
                id="autorizacionOtro"
                name="autorizacion_pastor"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.autorizacion_pastor}
                className="ml-2 flex-1 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
             </div>
            </div>
            {formik.touched.autorizacion_pastor &&
              formik.errors.autorizacion_pastor && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.autorizacion_pastor}
                </p>
              )}
          </div>

          <div>
            <label
              htmlFor="ministerio"
              className="block text-sm font-medium text-gray-700"
            >
              Ministerio Personal:
            </label>
            <input
              type="text"
              id="ministerio"
              name="ministerio"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.ministerio}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {formik.touched.ministerio && formik.errors.ministerio && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.ministerio}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pastorea una congregación?:
            </label>
            <div className="flex items-center">
              <input
                type="radio"
                id="pastoreaSi"
                name="pastorea"
                value="si"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <label
                htmlFor="pastoreaSi"
                className="ml-2 mr-8 text-sm text-gray-700"
              >
                Sí
              </label>
              <input
                type="radio"
                id="pastoreaNo"
                name="pastorea"
                value="no"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <label
                htmlFor="pastoreaNo"
                className="ml-2 text-sm text-gray-700"
              >
                No
              </label>
            </div>
            {formik.touched.pastorea && formik.errors.pastorea && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.pastorea}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="ejerce_ministerio"
              className="block text-sm font-medium text-gray-700"
            >
              Ejerce alguno de los siguientes Ministerios:
            </label>
            <select
              id="ejerce_ministerio"
              name="ejerce_ministerio"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.ejerce_ministerio}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="" disabled>
                Seleccione un ministerio
              </option>
              <option value="Pastor">Pastor</option>
              <option value="Profeta">Profeta</option>
              <option value="Apostol">Apostol</option>
              <option value="Maestro">Maestro</option>
              <option value="Evangelista">Evangelista</option>
              <option value="Ninguno">Ninguno</option>
            </select>
            {formik.touched.ejerce_ministerio &&
              formik.errors.ejerce_ministerio && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.ejerce_ministerio}
                </p>
              )}
          </div>
          <div>
            <label
              htmlFor="miembros"
              className="block text-sm font-medium text-gray-700"
            >
              Cuantos miembros tiene su Congregación:
            </label>
            <select
              id="miembros"
              name="miembros"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.miembros}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="" disabled>
                Seleccione una opción
              </option>
              <option value="Menos de 100">Menos de 100</option>
              <option value="Menos de 500">Menos de 500</option>
              <option value="Menos de 1.000">Menos de 1.000</option>
              <option value="Menos de 5.000">Menos de 5.000</option>
              <option value="Más de 5.000">Más de 5.000</option>
            </select>
            {formik.touched.miembros && formik.errors.miembros && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.miembros}
              </p>
            )}
          </div>
         
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                id="privacyPolicy"
                name="privacyPolicy"
                type="checkbox"
                checked={formik.values.privacyPolicy}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded"
              />
              <label
                htmlFor="privacyPolicy"
                className="ml-2 text-sm text-gray-700"
              >
                Acepto la{" "}
                <a
                  href="/privacy-policy"
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  política de privacidad
                </a>
              </label>
            </div>
            {formik.touched.privacyPolicy && formik.errors.privacyPolicy && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.privacyPolicy}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                id="dataTreatmentPolicy"
                name="dataTreatmentPolicy"
                type="checkbox"
                checked={formik.values.dataTreatmentPolicy}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded"
              />
              <label
                htmlFor="dataTreatmentPolicy"
                className="ml-2 text-sm text-gray-700"
              >
                Acepto la{" "}
                <a
                  href="/data-treatment-policy"
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  política de tratamiento de datos
                </a>
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
              className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Debe aceptar las políticas</DialogTitle>
        <DialogContent>
          <p>
            Para continuar, debe aceptar la política de privacidad y la política
            de tratamiento de datos.
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
