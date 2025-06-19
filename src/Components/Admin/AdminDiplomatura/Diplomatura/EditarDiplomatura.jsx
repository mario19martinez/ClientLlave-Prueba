import Modal from "react-modal";
import { useEffect, useState } from "react";
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
import { toast } from "react-toastify";
import UploadWidget from "../../../UploadWidget/UploadWidget";

Modal.setAppElement("#root");

export default function EditarDiplomatura({ isOpen, onRequestClose, diplomaturaData, onUpdated }) {
  const [previewImage, setPreviewImage] = useState("");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: diplomaturaData?.name || "",
      image: diplomaturaData?.image || "",
      certificacion: diplomaturaData?.certificacion || false,
      description: diplomaturaData?.description || "",
      precio: diplomaturaData?.precio || "",
      premium: diplomaturaData?.premium ?? true,
      precio_certificado: diplomaturaData?.precio_certificado || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio."),
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
            .required("Requerido si incluye certificación")
            .min(0, "Debe ser mayor o igual a 0"),
        }),
    }),
    onSubmit: async (values) => {
      try {
        await axios.put(`/diplomatura/${diplomaturaData.id}`, values);
        toast.success("Diplomatura actualizada con éxito");
        onUpdated();
        onRequestClose();
      } catch (error) {
        console.error("Error al actualizar diplomatura:", error);
        toast.error("Error al actualizar diplomatura");
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
      className="z-50 w-[95%] max-w-2xl bg-white rounded-lg p-6 relative shadow-xl overflow-y-auto max-h-[95vh]"
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

          {formik.values.premium ? (
            <TextField
              label="Precio"
              name="precio"
              size="small"
              value={formik.values.precio}
              onChange={formik.handleChange}
              error={formik.touched.precio && Boolean(formik.errors.precio)}
              helperText={formik.touched.precio && formik.errors.precio}
            />
          ) : null}
        </div>

        <FormControlLabel
          control={
            <Switch
              name="premium"
              checked={formik.values.premium}
              onChange={(e) => {
                const isPremium = e.target.checked;
                formik.setFieldValue("premium", isPremium);
                if (isPremium) {
                  formik.setFieldValue("certificacion", true);
                }
              }}
              color="primary"
            />
          }
          label={formik.values.premium ? "De pago" : "Gratuita"}
        />

        {!formik.values.premium && (
          <>
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
                  formik.touched.precio_certificado &&
                  formik.errors.precio_certificado
                }
              />
            )}
          </>
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