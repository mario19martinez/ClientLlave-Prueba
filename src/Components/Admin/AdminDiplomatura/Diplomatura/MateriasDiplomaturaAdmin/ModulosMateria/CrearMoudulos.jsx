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

// Submodal para agregar/editar preguntas
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

    if (modoEditar && indiceEditando !== null) {
      const copia = [...preguntas];
      copia[indiceEditando] = nueva;
      setPreguntas(copia);
    } else {
      setPreguntas([...preguntas, nueva]);
    }

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
    const copia = [...preguntas];
    const nuevoIndex = index + direccion;
    if (nuevoIndex < 0 || nuevoIndex >= copia.length) return;
    const temp = copia[nuevoIndex];
    copia[nuevoIndex] = copia[index];
    copia[index] = temp;
    setPreguntas(copia);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Preguntas del módulo</DialogTitle>
      <DialogContent>
        {preguntas.map((p, i) => (
          <Box
            key={i}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            bgcolor="#f9f9f9"
            borderRadius={2}
            p={1}
            mb={1}
          >
            <Typography>
              <strong>{i + 1}.</strong> [{p.tipo}] {p.enunciado}
            </Typography>
            <Box>
              <IconButton onClick={() => moverPregunta(i, -1)}>
                <ArrowUpward fontSize="small" />
              </IconButton>
              <IconButton onClick={() => moverPregunta(i, 1)}>
                <ArrowDownward fontSize="small" />
              </IconButton>
              <IconButton onClick={() => editarPregunta(i)}>
                <Edit fontSize="small" />
              </IconButton>
              <IconButton onClick={() => eliminarPregunta(i)}>
                <Delete fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        ))}

        <Box mt={3}>
          <TextField
            fullWidth
            label="Enunciado"
            value={enunciado}
            onChange={(e) => setEnunciado(e.target.value)}
            margin="normal"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Tipo de pregunta</InputLabel>
            <Select
              value={tipo}
              label="Tipo de pregunta"
              onChange={(e) => setTipo(e.target.value)}
            >
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
                  label="Respuesta correcta"
                  onChange={(e) => setRespuesta(e.target.value)}
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
                label="Respuesta"
                onChange={(e) => setRespuesta(e.target.value)}
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
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Modal para crear módulo con Formik
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
        Crear nuevo módulo
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
            activo: false, // Todos los módulos inactivos por defecto
          };

          try {
            await axios.post(`/materia/${materiaId}/modulo`, datosFinales);
            onRequestClose();
          } catch (error) {
            console.error("Error al crear módulo:", error);
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
              margin="normal"
            />

            <TextField
              fullWidth
              label="Descripción"
              name="descripcion"
              value={values.descripcion}
              onChange={handleChange}
              error={touched.descripcion && !!errors.descripcion}
              helperText={touched.descripcion && errors.descripcion}
              margin="normal"
            />

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Contenido"
              name="contenido"
              value={values.contenido}
              onChange={handleChange}
              error={touched.contenido && !!errors.contenido}
              helperText={touched.contenido && errors.contenido}
              margin="normal"
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
              margin="normal"
            />

            <Box mt={2} display="flex" justifyContent="space-between">
              <Button variant="outlined" onClick={() => setShowPreguntas(true)}>
                Gestionar Preguntas
              </Button>
              <Box display="flex" gap={1}>
                <Button onClick={onRequestClose} color="error" variant="outlined">
                  Cancelar
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Crear Módulo
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