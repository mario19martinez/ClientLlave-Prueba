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
      description: Yup.string(),
      precio: Yup.number()
        .when("premium", {
          is: true,
          then: (schema) =>
            schema.required("El precio es obligatorio para diplomaturas pagas").min(0, "Debe ser mayor o igual a 0"),
        })
        .typeError("Debe ser un número válido"),
      precio_certificado: Yup.number()
        .when(["premium", "certificacion"], {
          is: (premium, certificacion) => !premium && certificacion,
          then: (schema) =>
            schema.required("Indica el precio del certificado").min(0, "Debe ser mayor o igual a 0"),
        })
        .typeError("Debe ser un número válido"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const payload = {
        ...values,
        certificacion: values.premium ? true : values.certificacion,
        precio: values.premium ? values.precio : 0,
        precio_certificado:
          values.premium || !values.certificacion ? null : values.precio_certificado,
      };

      try {
        await axios.post("/diplomatura", payload);
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
      className="z-50 max-w-[600px] w-[95%] bg-white rounded-lg p-6 relative shadow-xl max-h-[90vh] overflow-y-auto"
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
        {/* Nombre */}
        <TextField
          label="Nombre"
          name="name"
          fullWidth
          size="small"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        {/* Switch De pago */}
        <FormControlLabel
          control={
            <Switch
              name="premium"
              checked={formik.values.premium}
              onChange={(e) => {
                const isPaid = e.target.checked;
                formik.setFieldValue("premium", isPaid);
                if (isPaid) {
                  formik.setFieldValue("certificacion", true); // Forzar certificación en pagas
                  formik.setFieldValue("precio_certificado", "");
                } else {
                  formik.setFieldValue("precio", "");
                }
              }}
              color="primary"
            />
          }
          label={formik.values.premium ? "Diplomatura de pago" : "Diplomatura gratuita"}
        />

        {/* Si es de pago, mostrar precio */}
        {formik.values.premium && (
          <TextField
            label="Precio"
            name="precio"
            size="small"
            fullWidth
            value={formik.values.precio}
            onChange={formik.handleChange}
            error={formik.touched.precio && Boolean(formik.errors.precio)}
            helperText={formik.touched.precio && formik.errors.precio}
          />
        )}

        {/* Si es gratuita, permitir decidir certificación */}
        {!formik.values.premium && (
          <>
            <FormControlLabel
              control={
                <Switch
                  name="certificacion"
                  checked={formik.values.certificacion}
                  onChange={(e) => formik.setFieldValue("certificacion", e.target.checked)}
                  color="primary"
                />
              }
              label="Incluye certificación"
            />
            {formik.values.certificacion && (
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
          </>
        )}

        {/* Imagen y Upload */}
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

        {/* Preview imagen */}
        {previewImage && (
          <div className="mt-2 text-center">
            <img
              src={previewImage}
              alt="Vista previa"
              className="w-full h-40 object-cover rounded border"
            />
          </div>
        )}

        {/* Descripción */}
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

        {/* Botón de envío */}
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