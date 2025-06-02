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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import YouTube from "react-youtube";

export default function DetallesClase({
  open,
  clase,
  onClose,
  onEditar,
  onEliminar,
}) {
  if (!clase) return null;

  const obtenerYoutubeId = (url) => {
    const match = url?.match(
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
    );
    return match ? match[1] : null;
  };

  const youtubeId = obtenerYoutubeId(clase.url);

  return (
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
        Detalles de la Clase
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
        <Typography variant="h6" gutterBottom>
          {clase.name}
        </Typography>

        {youtubeId ? (
          <Box
            sx={{
              position: "relative",
              width: "100%",
              overflow: "hidden",
              borderRadius: 2,
              boxShadow: 2,
              mb: 3,
              aspectRatio: "16/9", // ⬅ Nueva forma moderna si tu navegador lo permite
            }}
          >
            <YouTube
              videoId={youtubeId}
              opts={{
                width: "100%",
                height: "100%",
                playerVars: {
                  modestbranding: 1,
                  rel: 0,
                },
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
        ) : (
          <Typography color="text.secondary" mb={3}>
            No se proporcionó un video de YouTube válido.
          </Typography>
        )}

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

        {clase.pdfURL && (
          <>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              PDF asociado:
            </Typography>
            <Link
              href={clase.pdfURL}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              color="primary"
            >
              Ver PDF
            </Link>
            <Divider sx={{ my: 2 }} />
          </>
        )}

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
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
