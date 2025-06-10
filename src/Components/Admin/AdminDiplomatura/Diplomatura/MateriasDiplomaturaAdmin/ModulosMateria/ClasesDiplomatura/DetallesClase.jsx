import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  IconButton,
  Stack,
  Link,
  Dialog as ModalTaller,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import YouTube from "react-youtube";
import { useState } from "react";

export default function DetallesClase({ open, clase, onClose, onEditar, onEliminar }) {
  const [modalTallerAbierto, setModalTallerAbierto] = useState(false);

  if (!clase) return null;

  const obtenerYoutubeId = (url) => {
    const match = url?.match(
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
    );
    return match ? match[1] : null;
  };

  const youtubeId = obtenerYoutubeId(clase.url);

  const renderEmbed = (label, html) =>
    html ? (
      <>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          {label}:
        </Typography>
        <Box
          sx={{
            border: "1px solid #ddd",
            borderRadius: 2,
            overflow: "hidden",
            my: 2,
          }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </>
    ) : null;

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle
          sx={{
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 1,
          }}
        >
          Detalles del Recurso
          <Stack direction="row" spacing={1}>
            <IconButton color="primary" onClick={() => onEditar(clase)}>
              <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={() => onEliminar(clase)}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent dividers sx={{ pt: 1 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight={600} gutterBottom>
              {clase.name}
            </Typography>
            {clase.taller?.length > 0 && (
              <Button size="small" variant="outlined" onClick={() => setModalTallerAbierto(true)}>
                Taller
              </Button>
            )}
          </Box>

          {/* Video */}
          {youtubeId ? (
            <Box
              sx={{
                position: "relative",
                width: "100%",
                overflow: "hidden",
                borderRadius: 2,
                boxShadow: 2,
                mb: 3,
                aspectRatio: "16 / 9",
              }}
            >
              <YouTube
                videoId={youtubeId}
                opts={{
                  width: "100%",
                  height: "100%",
                  playerVars: { modestbranding: 1, rel: 0 },
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              />
            </Box>
          ) : null}

          {/* Texto */}
          {clase.texto && (
            <>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Contenido:
              </Typography>
              <Typography paragraph sx={{ textAlign: "justify" }}>
                {clase.texto}
              </Typography>
              <Divider sx={{ my: 2 }} />
            </>
          )}

          {/* PDF */}
          {clase.pdfURL && (
            <>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                PDF Asociado:
              </Typography>
              <Link href={clase.pdfURL} target="_blank" rel="noopener noreferrer" underline="hover">
                Ver PDF
              </Link>
              <Divider sx={{ my: 2 }} />
            </>
          )}

          {/* Resumen */}
          {clase.resumen?.puntos?.length > 0 && (
            <>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Resumen:
              </Typography>
              <Box component="ul" sx={{ pl: 3, mb: 0 }}>
                {clase.resumen.puntos.map((p, idx) => (
                  <li key={idx}>
                    <Typography variant="body2">{p}</Typography>
                  </li>
                ))}
              </Box>
              <Divider sx={{ my: 2 }} />
            </>
          )}

          {/* Contenidos embebidos */}
          {renderEmbed("Incrustado 1 (General)", clase.embedGeneral)}
          {renderEmbed("Incrustado 2 (Interactivo)", clase.embedInteractivo)}
          {renderEmbed("Incrustado 3", clase.embedTercero)}
          {renderEmbed("Incrustado 4", clase.embedCuarto)}

          {/* Infografías */}
          {clase.infografias && (
            <>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Infografías:
              </Typography>
              <Link href={clase.infografias} target="_blank" rel="noopener noreferrer">
                Ver Infografía
              </Link>
              <Divider sx={{ my: 2 }} />
            </>
          )}

          {/* Resumen corto */}
          {clase.resumenCorto && (
            <>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Resumen Corto:
              </Typography>
              <Typography>{clase.resumenCorto}</Typography>
              <Divider sx={{ my: 2 }} />
            </>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={onClose} variant="outlined">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal Taller */}
      <ModalTaller open={modalTallerAbierto} onClose={() => setModalTallerAbierto(false)} maxWidth="md" fullWidth>
        <DialogTitle>Taller: Preguntas del recurso</DialogTitle>
        <DialogContent dividers>
          {clase.taller?.map((pregunta, index) => (
            <Box key={index} mb={3}>
              <Typography fontWeight="bold" gutterBottom>
                {index + 1}. {pregunta.pregunta}
              </Typography>

              {pregunta.tipo === "abierta" && (
                <Typography color="text.secondary">
                  Respuesta abierta del estudiante (no tiene respuesta fija).
                </Typography>
              )}

              {pregunta.tipo === "verdadero_falso" && (
                <Typography>
                  Respuesta correcta:{" "}
                  <strong>{pregunta.respuesta ? "Verdadero" : "Falso"}</strong>
                </Typography>
              )}

              {pregunta.tipo === "opcion_multiple" && (
                <>
                  <Typography variant="subtitle2">Opciones:</Typography>
                  <ul>
                    {pregunta.opciones?.map((op, i) => (
                      <li key={i}>
                        <Typography
                          color={op === pregunta.respuesta ? "primary" : "text.primary"}
                          fontWeight={op === pregunta.respuesta ? "bold" : "normal"}
                        >
                          {op}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </Box>
          ))}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setModalTallerAbierto(false)}>Cerrar</Button>
        </DialogActions>
      </ModalTaller>
    </>
  );
}