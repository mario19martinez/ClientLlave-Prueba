import { useState, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import PropTypes from "prop-types";
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
  tipo_documento: "",
  email: "",
  telefono: "",
  pais: "",
  privacyPolicy: false,
  dataTreatmentPolicy: false,
  campaña: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es requerido"),
  last_name: Yup.string().required("El apellido es requerido"),
  email: Yup.string()
    .email("Ingresa un email válido")
    .required("El email es requerido"),
  telefono: Yup.string().required("El teléfono es requerido"),
  pais: Yup.string().required("El país es requerido"),
  identificacion: Yup.string().required("La identificación es requerida"),
  tipo_documento: Yup.string().required("El tipo de documento es requerido"),
  privacyPolicy: Yup.boolean().oneOf(
    [true],
    "Debes aceptar la política de privacidad"
  ),
  dataTreatmentPolicy: Yup.boolean().oneOf(
    [true],
    "Debes aceptar la política de tratamiento de datos"
  ),
});

export default function FormBlanco({ idCampain }) {
  const [fullPhoneNumber, setFullPhoneNumber] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [tipoDocumentoOptions, setTipoDocumentoOptions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [initialValuesWithCampaign, setInitialValuesWithCampaign] =
    useState(initialValues);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        console.log("ID de la campaña:", idCampain); // Log del ID de la campaña
        const response = await axios.get(`/campein/${idCampain}`);
        const campaignName = response.data.name;
        console.log("Nombre de la campaña:", campaignName); // Log del nombre de la campaña
        setInitialValuesWithCampaign((prevValues) => ({
          ...prevValues,
          campaña: campaignName,
        }));
      } catch (error) {
        console.error("Error al obtener la campaña:", error);
      }
    };

    fetchCampaign();
  }, [idCampain]);

  const formik = useFormik({
    initialValues: initialValuesWithCampaign,
    enableReinitialize: true, // Allow the form to reinitialize with new initialValues
    validationSchema,
    onSubmit: async (values) => {
      values.telefono = `${selectedCountryCode} ${fullPhoneNumber}`;
      if (!values.privacyPolicy || !values.dataTreatmentPolicy) {
        setOpenDialog(true);
        return;
      }
      try {
        console.log("Datos enviados:", values);
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
    <div className="bg-white ">
      <h1 className="text-2xl text-gray-800 font-bold text-center mb-6">
        Regístrate ahora
      </h1>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              className="mt-1 block w-full text-gray-500 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
              className="mt-1 text-gray-500 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
              const selectedCountry = paisesData.paises.find(
                (pais) => pais.nombre === e.target.value
              );
              setSelectedCountryCode(selectedCountry.codigo_telefonico);
              updateTipoDocumentoOptions(e.target.value);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.pais}
            className="mt-1 text-gray-500 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
              className="mt-1 block text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
              className="mt-1 text-gray-700 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {formik.touched.identificacion && formik.errors.identificacion && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.identificacion}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              className="mt-1 text-gray-500 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
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
              className="mt-1 block text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
            className="mt-1 text-gray-500 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
          )}
        </div>
        <div className="flex items-center">
          <input
            id="privacyPolicy"
            name="privacyPolicy"
            type="checkbox"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            checked={formik.values.privacyPolicy}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label
            htmlFor="privacyPolicy"
            className="ml-2 block text-sm text-gray-900"
          >
            Acepto la política de privacidad
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="dataTreatmentPolicy"
            name="dataTreatmentPolicy"
            type="checkbox"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            checked={formik.values.dataTreatmentPolicy}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label
            htmlFor="dataTreatmentPolicy"
            className="ml-2 block text-sm text-gray-900"
          >
            Acepto la política de tratamiento de datos
          </label>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Registrarse
          </button>
        </div>
      </form>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          Políticas de privacidad y tratamiento de datos
        </DialogTitle>
        <DialogContent>
          Debes aceptar las políticas de privacidad y tratamiento de datos para
          continuar.
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

FormBlanco.propTypes = {
  idCampain: PropTypes.string.isRequired,
};
