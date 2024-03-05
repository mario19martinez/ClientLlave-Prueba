// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams, useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Snackbar } from "@mui/material";

export default function EditEgresados() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState("");
  const [template, setTemplate] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchEgresado = async () => {
      try {
        const response = await axios.get(`/egresados/${id}`);
        const egresado = response.data;
        setName(egresado.name);
        setContent(egresado.content);
        setMedia(egresado.media);
        setTemplate(egresado.template);
      } catch (error) {
        console.error("Error fetching egresado:", error);
      }
    };

    fetchEgresado();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`/egresados/${id}`, { name, content, media, template });
      setOpenSnackbar(true);
      navigate("/admin/Egresados");
    } catch (error) {
      console.error("Error updating egresado:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    navigate("/admin/Egresados");
  };

  return (
    <div className="px-20 py-10">
      <div className="pb-5 justify-start">
        <button
          onClick={() => navigate("/admin/Egresados")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Atras
        </button>
      </div>
      <Typography variant="h4" gutterBottom>
        Editar Egresado
      </Typography>
      <form onSubmit={handleUpdate} className="space-y-4">
        <TextField
          id="name"
          label="Nombre"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="border border-gray-200 rounded-md">
          <ReactQuill theme="snow" value={content} onChange={setContent} />
        </div>
        <TextField
          id="media"
          label="Media"
          variant="outlined"
          fullWidth
          value={media}
          onChange={(e) => setMedia(e.target.value)}
        />
        <TextField
          id="template"
          label="Template"
          variant="outlined"
          select
          fullWidth
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          SelectProps={{
            native: false, // Asegura que el componente actúe como un selector
          }}
        >
          <option value="1">Template 1</option>
          <option value="2">Template 2</option>
        </TextField>
        <Button variant="contained" type="submit" color="primary">
          Guardar cambios
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="El egresado ha sido actualizado con éxito"
        action={
          <Button color="inherit" size="small" onClick={handleCloseSnackbar}>
            Aceptar
          </Button>
        }
      />
    </div>
  );
}
