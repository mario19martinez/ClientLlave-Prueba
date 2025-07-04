import { useState, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import paisesData from "../../FormResgistro/Paises.json";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  clearRegistrationStatus,
} from "../../../Redux/features/Users/usersSlice";
import { toast } from "react-toastify";
import "tailwindcss/tailwind.css";

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

const RegistrationModal = () => {
  const dispatch = useDispatch();
  const [fullPhoneNumber, setFullPhoneNumber] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("");

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
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
    }),
    onSubmit: async (values) => {
      values.telefono = `${selectedCountryCode} ${values.telefono}`;
      try {
        await dispatch(registerUser(values));
        toast.success("Registro exitoso.", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: false,
          theme: "colored",
        });
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
    <div className="">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">Registro</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="mb-3">
              <label htmlFor="name" className="block text-gray-700">
                Nombre:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {formik.touched.name && formik.errors.name ? (
                <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="last_name" className="block text-gray-700">
                Apellido:
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.last_name}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {formik.touched.last_name && formik.errors.last_name ? (
                <p className="text-red-500 text-sm mt-1">{formik.errors.last_name}</p>
              ) : null}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="mb-3">
              <label htmlFor="pais" className="block text-gray-700">
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
                className="w-full p-2 border border-gray-300 rounded-md"
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

            <div className="mb-3">
              <label htmlFor="telefono" className="block text-gray-700">
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
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {formik.touched.telefono && formik.errors.telefono ? (
                <p className="text-red-500 text-sm mt-1">{formik.errors.telefono}</p>
              ) : null}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="block text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            ) : null}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="mb-3">
              <label htmlFor="contraseña" className="block text-gray-700">
                Contraseña:
              </label>
              <input
                type="password"
                id="contraseña"
                name="contraseña"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.contraseña}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {formik.touched.contraseña && formik.errors.contraseña ? (
                <p className="text-red-500 text-sm mt-1">{formik.errors.contraseña}</p>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="block text-gray-700">
                Confirmar Contraseña:
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.confirmPassword}
                </p>
              ) : null}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-4"
          >
            Regístrar Usuario
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;