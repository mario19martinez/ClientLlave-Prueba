import { useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function EditarClase({ open, onClose, clase, onActualizada }) {
  if (!clase) return null;

  const validacion = Yup.object().shape({
    name: Yup.string().required("El nombre es obligatorio"),
    url: Yup.string().url("Debe ser una URL válida").nullable(),
    pdfURL: Yup.string().url("Debe ser una URL válida").nullable(),
    texto: Yup.string().nullable(),
    resumen: Yup.string().nullable(),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const payload = {
        ...values,
        resumen: values.resumen
          ? { puntos: values.resumen.split(",").map((p) => p.trim()) }
          : null,
      };

      await axios.put(
        `/materia/${clase.materiaId}/modulo/${clase.moduloId}/clase/${clase.id}`,
        payload
      );

      if (onActualizada) onActualizada();
      onClose();
    } catch (error) {
      console.error("Error al editar clase:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={!!open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Clase</DialogTitle>
      <Formik
        enableReinitialize
        initialValues={{
          name: clase.name || "",
          url: clase.url || "",
          pdfURL: clase.pdfURL || "",
          texto: clase.texto || "",
          resumen: clase.resumen?.puntos?.join(", ") || "",
        }}
        validationSchema={validacion}
        onSubmit={handleSubmit}
      >
        {({
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
          isSubmitting,
        }) => (
          <Form>
            <DialogContent>
              <TextField
                name="name"
                label="Nombre de la Clase"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                margin="normal"
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />

              <TextField
                name="url"
                label="URL del Video (opcional)"
                value={values.url}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                margin="normal"
                error={touched.url && !!errors.url}
                helperText={touched.url && errors.url}
              />

              <TextField
                name="pdfURL"
                label="URL del PDF (opcional)"
                value={values.pdfURL}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                margin="normal"
                error={touched.pdfURL && !!errors.pdfURL}
                helperText={touched.pdfURL && errors.pdfURL}
              />

              <TextField
                name="texto"
                label="Texto o contenido de la clase (opcional)"
                value={values.texto}
                onChange={handleChange}
                onBlur={handleBlur}
                multiline
                minRows={3}
                fullWidth
                margin="normal"
              />

              <TextField
                name="resumen"
                label="Resumen (separar por comas)"
                value={values.resumen}
                onChange={handleChange}
                onBlur={handleBlur}
                multiline
                minRows={2}
                fullWidth
                margin="normal"
                placeholder="Introducción, Objetivos, Conclusión..."
              />
            </DialogContent>

            <DialogActions>
              <Button onClick={onClose}>Cancelar</Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Guardar Cambios
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
