import Modal from "react-modal";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

export default function EditarDiplomatura({
  isOpen,
  onRequestClose,
  diplomaturaData,
  onUpdated,
}) {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: diplomaturaData?.name || "",
      image: diplomaturaData?.image || "",
      certificacion: diplomaturaData?.certificacion || false,
      description: diplomaturaData?.description || "",
      precio: diplomaturaData?.precio || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio."),
      image: Yup.string().url("Debe ser una URL válida").nullable(),
      certificacion: Yup.boolean(),
      description: Yup.string(),
      precio: Yup.number()
        .min(0, "Debe ser mayor o igual a 0")
        .typeError("Debe ser un número válido"),
    }),
    onSubmit: async (values) => {
      try {
        await axios.put(`/diplomatura/${diplomaturaData.id}`, values);
        toast.success("Diplomatura actualizada con éxito");
        onUpdated(); // para recargar la lista
        onRequestClose(); // cerrar modal
      } catch (error) {
        console.error("Error al actualizar diplomatura:", error);
        toast.error("Error al actualizar diplomatura");
      }
    },
  });

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
        Editar diplomatura
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
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
            <Checkbox
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
          Guardar cambios
        </Button>
      </form>
    </Modal>
  );
}
