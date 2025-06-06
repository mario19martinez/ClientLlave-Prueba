import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  MenuItem,
  Typography,
  Select,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import {
  ArrowUpward,
  ArrowDownward,
  Edit,
  Delete,
  Add,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

// ==========================
// Submodal para preguntas
// ==========================
function PreguntasModal({ isOpen, onClose, preguntas, setPreguntas }) {
  const [tipo, setTipo] = useState("multiple");
  const [enunciado, setEnunciado] = useState("");
  const [opciones, setOpciones] = useState(["", "", "", ""]);
  const [respuesta, setRespuesta] = useState("A");
  const [modoEditar, setModoEditar] = useState(false);
  const [indiceEditando, setIndiceEditando] = useState(null);
  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const limpiarFormulario = () => {
    setTipo("multiple");
    setEnunciado("");
    setOpciones(["", "", "", ""]);
    setRespuesta("A");
    setModoEditar(false);
    setIndiceEditando(null);
  };

  const agregarPregunta = () => {
    const nueva = {
      tipo,
      enunciado,
      ...(tipo === "multiple"
        ? { opciones, respuesta }
        : { respuesta: respuesta === "true" }),
    };

    const copia = [...preguntas];
    if (modoEditar && indiceEditando !== null) {
      copia[indiceEditando] = nueva;
    } else {
      copia.push(nueva);
    }

    setPreguntas(copia);
    limpiarFormulario();
  };

  const editarPregunta = (index) => {
    const p = preguntas[index];
    setTipo(p.tipo);
    setEnunciado(p.enunciado);
    if (p.tipo === "multiple") {
      setOpciones(p.opciones);
      setRespuesta(p.respuesta);
    } else {
      setRespuesta(p.respuesta ? "true" : "false");
    }
    setModoEditar(true);
    setIndiceEditando(index);
  };

  const eliminarPregunta = (index) => {
    const copia = [...preguntas];
    copia.splice(index, 1);
    setPreguntas(copia);
  };

  const moverPregunta = (index, direccion) => {
    const nuevoIndex = index + direccion;
    if (nuevoIndex < 0 || nuevoIndex >= preguntas.length) return;
    const copia = [...preguntas];
    [copia[index], copia[nuevoIndex]] = [copia[nuevoIndex], copia[index]];
    setPreguntas(copia);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Preguntas de la clase</DialogTitle>
      <DialogContent dividers>
        {preguntas.map((p, i) => (
          <Box
            key={i}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bgcolor="#f5f5f5"
            borderRadius={1}
            p={1}
            mb={1}
          >
            <Typography>
              <strong>{i + 1}.</strong> [{p.tipo.toUpperCase()}] {p.enunciado}
            </Typography>
            <Box>
              <IconButton onClick={() => moverPregunta(i, -1)} size="small">
                <ArrowUpward fontSize="small" />
              </IconButton>
              <IconButton onClick={() => moverPregunta(i, 1)} size="small">
                <ArrowDownward fontSize="small" />
              </IconButton>
              <IconButton onClick={() => editarPregunta(i)} size="small">
                <Edit fontSize="small" />
              </IconButton>
              <IconButton onClick={() => eliminarPregunta(i)} size="small">
                <Delete fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        ))}

        <Box mt={3}>
          <TextField
            fullWidth
            label="Enunciado de la pregunta"
            value={enunciado}
            onChange={(e) => setEnunciado(e.target.value)}
            margin="dense"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Tipo de pregunta</InputLabel>
            <Select value={tipo} onChange={(e) => setTipo(e.target.value)} label="Tipo de pregunta">
              <MenuItem value="multiple">Opción múltiple</MenuItem>
              <MenuItem value="vf">Verdadero / Falso</MenuItem>
            </Select>
          </FormControl>

          {tipo === "multiple" ? (
            <>
              {opciones.map((op, i) => (
                <TextField
                  key={i}
                  fullWidth
                  label={`Opción ${letras[i]}`}
                  value={op}
                  onChange={(e) => {
                    const nuevas = [...opciones];
                    nuevas[i] = e.target.value;
                    setOpciones(nuevas);
                  }}
                  margin="dense"
                />
              ))}
              <Button
                startIcon={<Add />}
                onClick={() => setOpciones([...opciones, ""])}
                sx={{ mt: 1 }}
              >
                Agregar opción
              </Button>

              <FormControl fullWidth margin="normal">
                <InputLabel>Respuesta correcta</InputLabel>
                <Select
                  value={respuesta}
                  onChange={(e) => setRespuesta(e.target.value)}
                  label="Respuesta correcta"
                >
                  {opciones.map((_, i) => (
                    <MenuItem key={i} value={letras[i]}>
                      {letras[i]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          ) : (
            <FormControl fullWidth margin="normal">
              <InputLabel>Respuesta</InputLabel>
              <Select
                value={respuesta}
                onChange={(e) => setRespuesta(e.target.value)}
                label="Respuesta"
              >
                <MenuItem value="true">Verdadero</MenuItem>
                <MenuItem value="false">Falso</MenuItem>
              </Select>
            </FormControl>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={agregarPregunta} variant="contained">
          {modoEditar ? "Actualizar" : "Agregar"} Pregunta
        </Button>
        <Button onClick={onClose} color="inherit">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ==========================
// Modal principal
// ==========================
export default function CrearModulos({ isOpen, onRequestClose }) {
  const { materiaId } = useParams();
  const [preguntas, setPreguntas] = useState([]);
  const [showPreguntas, setShowPreguntas] = useState(false);

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
            preguntas,
            activo: false,
          };

          try {
            await axios.post(`/materia/${materiaId}/clase`, datosFinales);
            onRequestClose();
          } catch (error) {
            console.error("Error al crear clase:", error);
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

            <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
              <Button variant="outlined" onClick={() => setShowPreguntas(true)}>
                Gestionar Preguntas
              </Button>
              <Box display="flex" gap={2}>
                <Button onClick={onRequestClose} variant="outlined" color="error">
                  Cancelar
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Crear Clase
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>

      <PreguntasModal
        isOpen={showPreguntas}
        onClose={() => setShowPreguntas(false)}
        preguntas={preguntas}
        setPreguntas={setPreguntas}
      />
    </Modal>
  );
}