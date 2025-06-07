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
import { useEffect } from "react";

const customStyles = {
  content: {
    maxWidth: "650px",
    width: "90%",
    margin: "auto",
    borderRadius: "20px",
    padding: "40px",
    inset: "50% auto auto 50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
    transition: "opacity 300ms ease, transform 300ms ease",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    transition: "opacity 300ms ease",
  },
};

Modal.setAppElement("#root");

export default function CrearClasesDiplomatura({ isOpen, onRequestClose, onSuccess }) {
  const { materiaId, moduloId: clasesmateriaId } = useParams();

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
        const resumenLimpio = values.resumen
          ? values.resumen
              .split(",")
              .map((p) => p.trim())
              .filter((p) => p.length > 0)
          : [];

        const payload = {
          ...values,
          resumen: { puntos: resumenLimpio },
        };

        const res = await axios.post(
          `/materia/${materiaId}/clase/${clasesmateriaId}/recurso`,
          payload
        );

        if (onSuccess) onSuccess(res.data);
        resetForm();
        onRequestClose();
      } catch (error) {
        console.error("Error al crear recurso:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <style>
        {`
        .modal-fade {
          opacity: 0;
          transform: translateY(-20px);
        }
        .modal-fade--after-open {
          opacity: 1;
          transform: translateY(0);
        }
        .modal-fade--before-close {
          opacity: 0;
          transform: translateY(-10px);
        }
        .modal-overlay {
          opacity: 0;
        }
        .modal-overlay--after-open {
          opacity: 1;
        }
        .modal-overlay--before-close {
          opacity: 0;
        }
      `}
      </style>

      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        closeTimeoutMS={300}
        contentLabel="Crear Recurso"
        style={customStyles}
        className={{
          base: "modal-fade",
          afterOpen: "modal-fade--after-open",
          beforeClose: "modal-fade--before-close",
        }}
        overlayClassName={{
          base: "modal-overlay",
          afterOpen: "modal-overlay--after-open",
          beforeClose: "modal-overlay--before-close",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Crear nuevo recurso didáctico
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nombre del recurso"
                name="name"
                fullWidth
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>

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

            <Grid item xs={12}>
              <TextField
                label="Texto o contenido (opcional)"
                name="texto"
                fullWidth
                multiline
                minRows={3}
                variant="outlined"
                value={formik.values.texto}
                onChange={formik.handleChange}
              />
            </Grid>

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

          <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
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
                "Crear Recurso"
              )}
            </Button>
          </Box>
        </form>
      </Modal>
    </>
  );
}
