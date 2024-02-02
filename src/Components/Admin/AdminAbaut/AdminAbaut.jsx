// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

const AdminAbout = () => {
  const navigate = useNavigate();
  const [abouts, setAbouts] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    // Realizar la solicitud GET para obtener todos los Abouts
    axios
      .get("/about")
      .then((response) => {
        setAbouts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching abouts:", error);
      });
  }, []);

  const handleDelete = async (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axios.delete(`/about/${deleteId}`);
      setAbouts(abouts.filter((about) => about.id !== deleteId));
      setOpenDialog(false);
    } catch (error) {
      console.error("Error deleting about:", error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleEdit = (id) => {
    navigate(`/Admin/EditarNosotros/${id}`); // Envía el ID a la ruta de edición
  };

  return (
    <div style={{ padding: "20px", width: "70%", margin: "0 auto" }}>
      <Button
        onClick={() => navigate("/Admin/CrearNosostros")}
        variant="contained"
        color="success"
        size="large"
        startIcon={<AddCircleOutlineIcon />}
        style={{ marginBottom: "20px" }}
      >
        Crear Nueva Sección
      </Button>
      <Typography variant="h3" gutterBottom>
        Nosotros
      </Typography>
      <div>
        {abouts.map((about) => (
          <Card key={about.id} variant="outlined" style={{ marginBottom: "20px", width: "100%" }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                {about.titulo}
              </Typography>
              <Typography variant="body1" color="text.secondary" dangerouslySetInnerHTML={{ __html: about.content }} />
            </CardContent>
            <CardActions>
              <IconButton
                onClick={() => handleDelete(about.id)}
                color="error"
                aria-label="Eliminar"
                sx={{
                  '&:hover': {
                    color: '#e53935',
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton color="primary" aria-label="Editar" onClick={() => handleEdit(about.id)}>
                <EditIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>¿Estás seguro de eliminar este elemento?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="outlined" color="error">
            Cancelar
          </Button>
          <Button onClick={handleDeleteConfirmed} variant="contained" color="error" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminAbout;
