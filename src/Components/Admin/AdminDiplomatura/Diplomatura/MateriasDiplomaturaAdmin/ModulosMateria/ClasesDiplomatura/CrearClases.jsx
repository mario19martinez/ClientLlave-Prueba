import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import Modal from "react-modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useParams } from "react-router-dom";

// Estilo básico para el modal (puedes refinar más)
const customStyles = {
  content: {
    maxWidth: "600px",
    margin: "auto",
    borderRadius: "16px",
    padding: "32px",
  },
};

Modal.setAppElement("#root");

export default function CrearClasesDiplomatura({ isOpen, onRequestClose, onSuccess }) {
  const { materiaId, moduloId } = useParams();

  const formik = useFormik({
    initialValues: {
      name: "",
      url: "",
      pdfURL: "",
      texto: "",
      resumen: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio"),
      url: Yup.string().url("Debe ser una URL válida").nullable(),
      pdfURL: Yup.string().url("Debe ser una URL válida").nullable(),
      texto: Yup.string().nullable(),
      resumen: Yup.string().nullable(),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const payload = {
          ...values,
          resumen: values.resumen ? { puntos: values.resumen.split(",").map(p => p.trim()) } : null,
        };

        const res = await axios.post(
          `/materia/${materiaId}/modulo/${moduloId}/clase`,
          payload
        );

        if (onSuccess) onSuccess(res.data.newClaseModulo);
        resetForm();
        onRequestClose();
      } catch (error) {
        console.error("Error al crear clase:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Crear Clase"
    >
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Crear Nueva Clase
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          {/* Nombre */}
          <Grid item xs={12}>
            <TextField
              label="Nombre de la clase"
              name="name"
              fullWidth
              variant="outlined"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>

          {/* URL Video */}
          <Grid item xs={12}>
            <TextField
              label="URL del video (opcional)"
              name="url"
              fullWidth
              variant="outlined"
              value={formik.values.url}
              onChange={formik.handleChange}
              error={formik.touched.url && Boolean(formik.errors.url)}
              helperText={formik.touched.url && formik.errors.url}
            />
          </Grid>

          {/* PDF */}
          <Grid item xs={12}>
            <TextField
              label="URL del PDF (opcional)"
              name="pdfURL"
              fullWidth
              variant="outlined"
              value={formik.values.pdfURL}
              onChange={formik.handleChange}
              error={formik.touched.pdfURL && Boolean(formik.errors.pdfURL)}
              helperText={formik.touched.pdfURL && formik.errors.pdfURL}
            />
          </Grid>

          {/* Texto de la clase */}
          <Grid item xs={12}>
            <TextField
              label="Texto o contenido de la clase (opcional)"
              name="texto"
              fullWidth
              multiline
              minRows={3}
              variant="outlined"
              value={formik.values.texto}
              onChange={formik.handleChange}
            />
          </Grid>

          {/* Resumen */}
          <Grid item xs={12}>
            <TextField
              label="Resumen (separar por comas)"
              name="resumen"
              fullWidth
              multiline
              minRows={2}
              variant="outlined"
              placeholder="Introducción, Objetivos, Conclusión..."
              value={formik.values.resumen}
              onChange={formik.handleChange}
            />
          </Grid>
        </Grid>

        <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" onClick={onRequestClose}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Crear Clase"
            )}
          </Button>
        </Box>
      </form>
    </Modal>
  );
}