import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  MenuItem,
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
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const payload = {
        ...values,
        resumen: values.resumen
          ? { puntos: values.resumen.split(",").map((p) => p.trim()) }
          : null,
        taller: values.taller,
      };

      await axios.put(
        `/materia/${clase.materiaId}/clase/${clase.clasesmateriaId}/recurso/${clase.id}`,
        payload
      );

      if (onActualizada) onActualizada();
      onClose();
    } catch (error) {
      console.error("Error al editar recurso:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={!!open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.25rem" }}>
        Editar Recurso
      </DialogTitle>

      <Formik
        enableReinitialize
        initialValues={{
          name: clase.name || "",
          url: clase.url || "",
          pdfURL: clase.pdfURL || "",
          texto: clase.texto || "",
          resumen: clase.resumen?.puntos?.join(", ") || "",
          embedGeneral: clase.embedGeneral || "",
          embedInteractivo: clase.embedInteractivo || "",
          embedTercero: clase.embedTercero || "",
          embedCuarto: clase.embedCuarto || "",
          infografias: clase.infografias || "",
          resumenCorto: clase.resumenCorto || "",
          taller: clase.taller || [],
        }}
        validationSchema={validacion}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, setFieldValue, isSubmitting, errors, touched }) => {
          const handleTallerChange = (index, field, value) => {
            const nuevo = [...values.taller];
            nuevo[index][field] = value;
            setFieldValue("taller", nuevo);
          };

          return (
            <Form>
              <DialogContent dividers>
                <TextField
                  name="name"
                  label="Nombre del recurso"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  margin="normal"
                  variant="outlined"
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
                  variant="outlined"
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
                  variant="outlined"
                  error={touched.pdfURL && !!errors.pdfURL}
                  helperText={touched.pdfURL && errors.pdfURL}
                />

                <TextField
                  name="texto"
                  label="Texto o contenido (opcional)"
                  value={values.texto}
                  onChange={handleChange}
                  multiline
                  minRows={3}
                  fullWidth
                  margin="normal"
                  variant="outlined"
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
                  variant="outlined"
                  placeholder="Introducción, Objetivos, Conclusión..."
                />

                <TextField
                  name="embedGeneral"
                  label="Incrustado 1 (general)"
                  value={values.embedGeneral}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />

                <TextField
                  name="embedInteractivo"
                  label="Incrustado 2 (interactivo)"
                  value={values.embedInteractivo}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />

                <TextField
                  name="embedTercero"
                  label="Incrustado 3"
                  value={values.embedTercero}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />

                <TextField
                  name="embedCuarto"
                  label="Incrustado 4"
                  value={values.embedCuarto}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />

                <TextField
                  name="infografias"
                  label="Infografías (opcional)"
                  value={values.infografias}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />

                <TextField
                  name="resumenCorto"
                  label="Resumen corto (opcional)"
                  value={values.resumenCorto}
                  onChange={handleChange}
                  multiline
                  minRows={2}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />

                <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
                  Taller de preguntas
                </Typography>

                {values.taller.map((pregunta, index) => (
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
                        const nuevo = [...values.taller];
                        nuevo.splice(index, 1);
                        setFieldValue("taller", nuevo);
                      }}
                      sx={{ mt: 1 }}
                    >
                      Eliminar
                    </Button>
                  </Box>
                ))}

                <Box display="flex" gap={1} mt={1}>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      setFieldValue("taller", [...values.taller, { tipo: "abierta", pregunta: "" }])
                    }
                  >
                    + Abierta
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      setFieldValue("taller", [
                        ...values.taller,
                        { tipo: "verdadero_falso", pregunta: "", respuesta: true },
                      ])
                    }
                  >
                    + V/F
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      setFieldValue("taller", [
                        ...values.taller,
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
              </DialogContent>

              <DialogActions sx={{ px: 3, py: 2 }}>
                <Button onClick={onClose} variant="outlined">
                  Cancelar
                </Button>
                <Button type="submit" variant="contained" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Guardar Cambios"
                  )}
                </Button>
              </DialogActions>
            </Form>
          );
        }}
      </Formik>
    </Dialog>
  );
}