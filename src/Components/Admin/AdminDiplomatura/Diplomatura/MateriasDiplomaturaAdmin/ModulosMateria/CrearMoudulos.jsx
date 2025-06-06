import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function CrearModulos({ isOpen, onRequestClose }) {
  const { materiaId } = useParams();

  const validationSchema = Yup.object({
    titulo: Yup.string().required("El título es obligatorio"),
    descripcion: Yup.string().required("La descripción es obligatoria"),
    contenido: Yup.string().required("El contenido es obligatorio"),
    precio: Yup.number().min(0).required("El precio es obligatorio"),
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="z-50 w-[90%] max-w-3xl bg-white rounded-lg p-6"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center"
    >
      <Typography variant="h6" gutterBottom>
        Crear nueva clase
      </Typography>

      <Formik
        initialValues={{
          titulo: "",
          descripcion: "",
          contenido: "",
          precio: 0,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const datosFinales = {
            ...values,
            activo: false,
          };

          console.log("✅ Enviando clase con datos:", datosFinales);

          try {
            await axios.post(`/materia/${materiaId}/clase`, datosFinales);
            onRequestClose();
          } catch (error) {
            console.error("❌ Error al crear clase:", error);
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

            <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
              <Button onClick={onRequestClose} variant="outlined" color="error">
                Cancelar
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Crear Clase
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}