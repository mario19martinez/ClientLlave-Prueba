import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import Modal from "react-modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useParams } from "react-router-dom";

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
      embedGeneral: "",
      embedInteractivo: "",
      embedTercero: "",
      embedCuarto: "",
      infografias: "",
      resumenCorto: "",
      taller: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio"),
      url: Yup.string().url("Debe ser una URL válida").nullable(),
      pdfURL: Yup.string().url("Debe ser una URL válida").nullable(),
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
          taller: values.taller,
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

  const handleTallerChange = (index, field, value) => {
    const newTaller = [...formik.values.taller];
    newTaller[index][field] = value;
    formik.setFieldValue("taller", newTaller);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          maxWidth: "700px",
          width: "90%",
          maxHeight: "90vh",
          margin: "auto",
          borderRadius: "16px",
          padding: "2rem",
          inset: "50% auto auto 50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#f9f9f9",
          border: "1px solid #ccc",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
          overflow: "auto",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        textAlign="center"
        sx={{ mb: 3 }}
      >
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
              placeholder="Ej: Introducción, Objetivos, Conclusión..."
              value={formik.values.resumen}
              onChange={formik.handleChange}
            />
          </Grid>

          {["embedGeneral", "embedInteractivo", "embedTercero", "embedCuarto"].map((name, i) => (
            <Grid item xs={12} key={name}>
              <TextField
                label={`Incrustado ${i + 1}`}
                name={name}
                fullWidth
                variant="outlined"
                multiline
                minRows={2}
                value={formik.values[name]}
                onChange={formik.handleChange}
              />
            </Grid>
          ))}

          <Grid item xs={12}>
            <TextField
              label="Infografías (opcional)"
              name="infografias"
              fullWidth
              variant="outlined"
              value={formik.values.infografias}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Resumen corto (opcional)"
              name="resumenCorto"
              fullWidth
              variant="outlined"
              multiline
              minRows={2}
              value={formik.values.resumenCorto}
              onChange={formik.handleChange}
            />
          </Grid>

          {/* Taller de preguntas */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
              Taller de preguntas
            </Typography>

            {formik.values.taller.map((pregunta, index) => (
              <Box key={index} mb={2} p={2} sx={{ border: "1px solid #ccc", borderRadius: 2 }}>
                <TextField
                  fullWidth
                  label={`Pregunta ${index + 1}`}
                  value={pregunta.pregunta}
                  onChange={(e) => handleTallerChange(index, "pregunta", e.target.value)}
                  sx={{ mb: 1 }}
                />

                {pregunta.tipo === "opcion_multiple" && (
                  <>
                    {pregunta.opciones.map((op, i) => (
                      <TextField
                        key={i}
                        fullWidth
                        label={`Opción ${i + 1}`}
                        value={op}
                        onChange={(e) => {
                          const nuevasOpciones = [...pregunta.opciones];
                          nuevasOpciones[i] = e.target.value;
                          handleTallerChange(index, "opciones", nuevasOpciones);
                        }}
                        sx={{ mb: 1 }}
                      />
                    ))}
                    <TextField
                      fullWidth
                      label="Respuesta correcta"
                      value={pregunta.respuesta}
                      onChange={(e) => handleTallerChange(index, "respuesta", e.target.value)}
                    />
                  </>
                )}

                {pregunta.tipo === "verdadero_falso" && (
                  <TextField
                    fullWidth
                    select
                    label="Respuesta"
                    value={pregunta.respuesta ? "true" : "false"}
                    onChange={(e) =>
                      handleTallerChange(index, "respuesta", e.target.value === "true")
                    }
                  >
                    <MenuItem value="true">Verdadero</MenuItem>
                    <MenuItem value="false">Falso</MenuItem>
                  </TextField>
                )}

                <Button
                  color="error"
                  variant="text"
                  size="small"
                  onClick={() => {
                    const nuevoTaller = [...formik.values.taller];
                    nuevoTaller.splice(index, 1);
                    formik.setFieldValue("taller", nuevoTaller);
                  }}
                  sx={{ mt: 1 }}
                >
                  Eliminar
                </Button>
              </Box>
            ))}

            <Box display="flex" gap={1} mt={2}>
              <Button
                variant="outlined"
                onClick={() =>
                  formik.setFieldValue("taller", [
                    ...formik.values.taller,
                    { tipo: "abierta", pregunta: "" },
                  ])
                }
              >
                + Abierta
              </Button>
              <Button
                variant="outlined"
                onClick={() =>
                  formik.setFieldValue("taller", [
                    ...formik.values.taller,
                    { tipo: "verdadero_falso", pregunta: "", respuesta: true },
                  ])
                }
              >
                + V/F
              </Button>
              <Button
                variant="outlined"
                onClick={() =>
                  formik.setFieldValue("taller", [
                    ...formik.values.taller,
                    {
                      tipo: "opcion_multiple",
                      pregunta: "",
                      opciones: ["", "", ""],
                      respuesta: "",
                    },
                  ])
                }
              >
                + Múltiple
              </Button>
            </Box>
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
            sx={{ backgroundColor: "#1976d2", color: "#fff" }}
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
  );
}