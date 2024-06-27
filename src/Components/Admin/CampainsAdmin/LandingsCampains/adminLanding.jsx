import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, TextField, Tooltip, Snackbar, Alert } from "@mui/material";
import { Campaign as CampaignIcon, Delete as DeleteIcon, Visibility as VisibilityIcon, Edit as EditIcon, Share as ShareIcon, ContentCopy as ContentCopyIcon, CheckCircle as CheckCircleIcon } from "@mui/icons-material";

export default function AdminLanding({ campeinId }) {
  const [landings, setLandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedLanding, setSelectedLanding] = useState(null);
  const [shareUrl, setShareUrl] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLandings = async () => {
      try {
        const response = await axios.get(
          `/campein/${campeinId}/landingcampein`
        );
        setLandings(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching landings:", error);
        setLoading(false);
      }
    };

    fetchLandings();
  }, [campeinId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/campein/${campeinId}/landingcampein/${selectedLanding}`);
      setLandings(landings.filter((landing) => landing.id !== selectedLanding));
      setOpen(false);
      console.log("Landing eliminada con éxito");
    } catch (error) {
      console.error("Error al eliminar la landing:", error);
    }
  };

  const handleOpenDialog = (landingId) => {
    setSelectedLanding(landingId);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedLanding(null);
  };

  const redirectToLanding = (landing) => {
    if (landing.idcurso) {
      navigate(
        `/campain/${landing.id}/Landing/${campeinId}/${landing.template}/curso/${landing.idcurso}`
      );
    } else {
      navigate(
        `/campain/${landing.id}/Landing/${campeinId}/${landing.template}`
      );
    }
  };

  const handleShare = (landing) => {
    const url = `${window.location.origin}/campain/${landing.id}/Landing/${campeinId}/${landing.template}`;
    setShareUrl(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopySuccess(true);
    setSnackbarOpen(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 5000);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="px-10 py-5 w-full">
      <Typography variant="h4" component="h1" gutterBottom>
        Landings campaña
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<CampaignIcon />}
        onClick={() =>
          navigate(`/Admin/campain/landing/SelecForm/${campeinId}`)
        }
        style={{ marginBottom: "16px" }}
      >
        Crear LandingPage
      </Button>
      {loading ? (
        <CircularProgress />
      ) : landings.length === 0 ? (
        <Typography>No hay landings disponibles para esta campaña.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Título</TableCell>
                <TableCell>Template</TableCell>
                <TableCell>idCurso</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {landings.map((landing) => (
                <TableRow key={landing.id}>
                  <TableCell>{landing.titulo}</TableCell>
                  <TableCell>{landing.template}</TableCell>
                  <TableCell>{landing.idcurso || "Curso no asociado"}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => redirectToLanding(landing)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => navigate(`/admin/campain/editLanding/${campeinId}/${landing.id}`)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleOpenDialog(landing.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      color="default"
                      onClick={() => handleShare(landing)}
                    >
                      <ShareIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {shareUrl && (
        <div className="mt-4 flex items-center space-x-2">
          <TextField
            label="URL de Compartir"
            value={shareUrl}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
          <Tooltip title="Copiar URL">
            <IconButton color="primary" onClick={handleCopy}>
              {copySuccess ? <CheckCircleIcon /> : <ContentCopyIcon />}
            </IconButton>
          </Tooltip>
        </div>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          URL copiada al portapapeles
        </Alert>
      </Snackbar>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro que desea eliminar esta landing?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AdminLanding.propTypes = {
  campeinId: PropTypes.string.isRequired,
};