import Modal from "react-modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UploadWidget from "../../../../UploadWidget/UploadWidget";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

export default function CrearMateria({ isOpen, onRequestClose, diplomaturaId, onCreated }) {
  const [previewImage, setPreviewImage] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
      description: "",
      precio: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio."),
      image: Yup.string().url("Debe ser una URL válida").nullable(),
      description: Yup.string(),
      precio: Yup.number()
        .min(0, "Debe ser mayor o igual a 0")
        .typeError("Debe ser un número válido"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await axios.post(`/diplomatura/${diplomaturaId}/materia`, values);
        toast.success("Materia creada con éxito");
        resetForm();
        onCreated(); // notifica al padre para recargar
        onRequestClose(); // cierra modal
      } catch (error) {
        console.error("Error al crear materia:", error);
        toast.error("No se pudo crear la materia");
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
        Crear materia
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-5">
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

        <TextField
          label="Precio"
          name="precio"
          fullWidth
          size="small"
          value={formik.values.precio}
          onChange={formik.handleChange}
          error={formik.touched.precio && Boolean(formik.errors.precio)}
          helperText={formik.touched.precio && formik.errors.precio}
        />

        <Button
          fullWidth
          type="submit"
          variant="contained"
          className="!bg-blue-600 hover:!bg-blue-700 text-white font-semibold py-2"
        >
          Crear Materia
        </Button>
      </form>
    </Modal>
  );
}