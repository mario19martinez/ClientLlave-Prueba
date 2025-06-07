import Modal from "react-modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  TextField,
  Button,
  Switch,
  FormControlLabel,
  IconButton,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UploadWidget from "../../../UploadWidget/UploadWidget";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

Modal.setAppElement("#root");

export default function CrearDiplomatura({ isOpen, onRequestClose, onCreated }) {
  const [previewImage, setPreviewImage] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
      certificacion: false,
      description: "",
      precio: "",
      premium: true,
      precio_certificado: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().trim().required("El nombre es obligatorio."),
      image: Yup.string().url("Debe ser una URL válida").nullable(),
      certificacion: Yup.boolean(),
      description: Yup.string(),
      precio: Yup.number()
        .min(0, "Debe ser mayor o igual a 0")
        .typeError("Debe ser un número válido"),
      precio_certificado: Yup.number()
        .when("premium", {
          is: false,
          then: Yup.number()
            .typeError("Debe ser un número válido")
            .required("Requerido si no es premium")
            .min(0, "Debe ser mayor o igual a 0"),
        }),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post("/diplomatura", values);
        toast.success("Diplomatura creada con éxito");
        resetForm();
        onCreated();
        onRequestClose();
      } catch (error) {
        console.error("Error al crear diplomatura:", error);
        toast.error("Error al crear diplomatura");
      }
    },
  });

  useEffect(() => {
    setPreviewImage(formik.values.image);
  }, [formik.values.image]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="z-50 w-[95%] max-w-lg bg-white rounded-lg p-6 relative shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center"
    >
      <IconButton
        onClick={onRequestClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
      >
        <CloseIcon />
      </IconButton>

      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Crear diplomatura
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            label="Nombre"
            name="name"
            size="small"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            label="Precio"
            name="precio"
            size="small"
            value={formik.values.precio}
            onChange={formik.handleChange}
            error={formik.touched.precio && Boolean(formik.errors.precio)}
            helperText={formik.touched.precio && formik.errors.precio}
          />
        </div>

        <FormControlLabel
          control={
            <Switch
              name="premium"
              checked={formik.values.premium}
              onChange={(e) => formik.setFieldValue("premium", e.target.checked)}
              color="primary"
            />
          }
          label={formik.values.premium ? "Premium" : "Gratuita"}
        />

        {!formik.values.premium && (
          <TextField
            label="Precio del certificado"
            name="precio_certificado"
            fullWidth
            size="small"
            value={formik.values.precio_certificado}
            onChange={formik.handleChange}
            error={
              formik.touched.precio_certificado &&
              Boolean(formik.errors.precio_certificado)
            }
            helperText={
              formik.touched.precio_certificado && formik.errors.precio_certificado
            }
          />
        )}

        <div className="flex items-center gap-4">
          <TextField
            label="Imagen (URL)"
            name="image"
            fullWidth
            size="small"
            value={formik.values.image}
            onChange={formik.handleChange}
            error={formik.touched.image && Boolean(formik.errors.image)}
            helperText={formik.touched.image && formik.errors.image}
          />
          <Tooltip title="Subir imagen con Cloudinary">
            <div>
              <UploadWidget
                onImageUpload={(url) => {
                  formik.setFieldValue("image", url);
                  setPreviewImage(url);
                }}
              />
            </div>
          </Tooltip>
        </div>

        {previewImage && (
          <div className="mt-2 text-center">
            <img
              src={previewImage}
              alt="Vista previa"
              className="w-full h-40 object-cover rounded border"
            />
          </div>
        )}

        <TextField
          label="Descripción"
          name="description"
          multiline
          rows={3}
          fullWidth
          size="small"
          value={formik.values.description}
          onChange={formik.handleChange}
        />

        <FormControlLabel
          control={
            <Switch
              name="certificacion"
              checked={formik.values.certificacion}
              onChange={formik.handleChange}
              color="primary"
            />
          }
          label="Incluye certificación"
        />

        <Button
          fullWidth
          type="submit"
          variant="contained"
          className="!bg-blue-600 hover:!bg-blue-700 text-white font-semibold py-2"
        >
          Registrar Diplomatura
        </Button>
      </form>
    </Modal>
  );
}