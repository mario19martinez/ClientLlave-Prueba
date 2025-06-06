import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function EditarModulo({ isOpen, onClose, modulo, onUpdate }) {
  const { materiaId } = useParams();

  const validationSchema = Yup.object({
    titulo: Yup.string().required("El título es obligatorio"),
    descripcion: Yup.string().required("La descripción es obligatoria"),
    contenido: Yup.string().required("El contenido es obligatorio"),
    precio: Yup.number().min(0).required("El precio es obligatorio"),
  });

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Editar Clase</DialogTitle>
      <DialogContent dividers>
        <Formik
          initialValues={{
            titulo: modulo.titulo || "",
            descripcion: modulo.descripcion || "",
            contenido: modulo.contenido || "",
            precio: modulo.precio || 0,
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            const datosFinales = {
              ...values,
              activo: modulo.activo,
            };

            try {
              await axios.put(`/materia/${materiaId}/clase/${modulo.id}`, datosFinales);
              toast.success("✅ Clase actualizada correctamente");
              onUpdate?.();
              onClose();
            } catch (error) {
              console.error("Error al editar clase:", error);
              toast.error("❌ Error al actualizar la clase");
            }
          }}
        >
          {({ values, handleChange, handleSubmit, errors, touched }) => (
            <Form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Título"
                name="titulo"
                value={values.titulo}
                onChange={handleChange}
                error={touched.titulo && !!errors.titulo}
                helperText={touched.titulo && errors.titulo}
                margin="dense"
              />

              <TextField
                fullWidth
                label="Descripción"
                name="descripcion"
                value={values.descripcion}
                onChange={handleChange}
                error={touched.descripcion && !!errors.descripcion}
                helperText={touched.descripcion && errors.descripcion}
                margin="dense"
              />

              <TextField
                fullWidth
                label="Contenido"
                name="contenido"
                multiline
                rows={4}
                value={values.contenido}
                onChange={handleChange}
                error={touched.contenido && !!errors.contenido}
                helperText={touched.contenido && errors.contenido}
                margin="dense"
              />

              <TextField
                fullWidth
                type="number"
                label="Precio"
                name="precio"
                value={values.precio}
                onChange={handleChange}
                error={touched.precio && !!errors.precio}
                helperText={touched.precio && errors.precio}
                margin="dense"
              />

              <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
                <Button onClick={onClose} variant="outlined" color="error">
                  Cancelar
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Guardar cambios
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}