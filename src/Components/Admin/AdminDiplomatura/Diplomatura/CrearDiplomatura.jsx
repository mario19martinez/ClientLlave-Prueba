import Modal from "react-modal";
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

export default function CrearDiplomatura({
  isOpen,
  onRequestClose,
  onCreated,
}) {
  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
      certificacion: false,
      description: "",
      precio: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().trim().required("El nombre es obligatorio."),
      image: Yup.string().url("Debe ser una URL válida").nullable(),
      certificacion: Yup.boolean(),
      description: Yup.string(),
      precio: Yup.number()
        .min(0, "Debe ser mayor o igual a 0")
        .typeError("Debe ser un número válido"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post("/diplomatura", values);
        toast.success("Diplomatura creada con éxito");
        resetForm();
        onCreated(); // Notifica al padre para recargar la lista
        onRequestClose(); // Cierra el modal
      } catch (error) {
        console.error("Error al crear diplomatura:", error);
        toast.error("Error al crear diplomatura");
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
      {/* Cierre en la esquina */}
      <IconButton
        onClick={onRequestClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
      >
        <CloseIcon />
      </IconButton>

      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Crear diplomatura
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
          Registrar Diplomatura
        </Button>
      </form>
    </Modal>
  );
}
