import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import AddIcon from "@mui/icons-material/Add";
import CrearClasesDiplomatura from "./CrearClases";

export default function AdministrarClases({ onFiltroChange }) {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("recientes");

  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);

  const manejarBusqueda = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);
    onFiltroChange({ busqueda: valor, orden });
  };

  const manejarOrden = (e) => {
    const valor = e.target.value;
    setOrden(valor);
    onFiltroChange({ busqueda, orden: valor });
  };

  return (
    <>
      <Paper elevation={2} sx={{ borderRadius: 4, padding: 4, marginBottom: 5 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={2}
          mb={3}
        >
          <Typography variant="h5" fontWeight={600}>
            Administrar Clases
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={abrirModal}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              fontWeight: 500,
              px: 3,
            }}
          >
            Crear Clase
          </Button>
        </Box>

        <Box display="flex" flexWrap="wrap" gap={3}>
          <TextField
            value={busqueda}
            onChange={manejarBusqueda}
            variant="outlined"
            placeholder="Buscar clase por nombre..."
            size="medium"
            sx={{ minWidth: 280, flexGrow: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <FormControl size="medium" sx={{ minWidth: 220 }}>
            <InputLabel id="ordenar-label">Ordenar por</InputLabel>
            <Select
              labelId="ordenar-label"
              value={orden}
              label="Ordenar por"
              onChange={manejarOrden}
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="recientes">Más recientes</MenuItem>
              <MenuItem value="antiguas">Más antiguas</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      <CrearClasesDiplomatura
        isOpen={modalAbierto}
        onRequestClose={cerrarModal}
        onSuccess={() => window.location.reload()}
      />
    </>
  );
}