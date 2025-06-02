import { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EditarClase({ open, onClose, clase, onActualizada }) {
  const { materiaId, moduloId } = useParams();
  const [datosClase, setDatosClase] = useState(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const obtenerDetalles = async () => {
      if (!clase || !open) return;

      setCargando(true);
      try {
        const res = await axios.get(`/materia/${materiaId}/modulo/${moduloId}/clase/${clase.id}`);
        setDatosClase(res.data);
      } catch (error) {
        console.error("Error al obtener datos de la clase:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerDetalles();
  }, [clase, open, materiaId, moduloId]);

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
        `/materia/${materiaId}/modulo/${moduloId}/clase/${clase.id}`,
        payload
      );

      onActualizada();
      onClose();
    } catch (error) {
      console.error("Error al editar clase:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!open || !clase) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Clase</DialogTitle>

      {cargando || !datosClase ? (
        <DialogContent sx={{ textAlign: "center", py: 4 }}>
          <CircularProgress />
          <Typography mt={2}>Cargando información...</Typography>
        </DialogContent>
      ) : (
        <Formik
          initialValues={{
            name: datosClase.name || "",
            url: datosClase.url || "",
            pdfURL: datosClase.pdfURL || "",
            texto: datosClase.texto || "",
            resumen: datosClase.resumen?.puntos?.join(", ") || "",
          }}
          enableReinitialize
          validationSchema={validacion}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
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
                  label="Texto de la clase (opcional)"
                  value={values.texto}
                  onChange={handleChange}
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
                  multiline
                  minRows={2}
                  fullWidth
                  margin="normal"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  Guardar Cambios
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      )}
    </Dialog>
  );
}