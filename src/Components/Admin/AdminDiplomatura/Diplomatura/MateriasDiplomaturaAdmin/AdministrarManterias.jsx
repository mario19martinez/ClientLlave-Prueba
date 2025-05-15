import { useState } from "react";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import CrearMateria from "./CrearMateria";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

export default function AdministrarMaterias({ search, setSearch, filter, setFilter, onReload }) {
  const { diplomaturaId } = useParams();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full">
      {/* Controles superiores */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        {/* Buscador */}
        <TextField
          label="Buscar materias"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3"
        />

        {/* Filtro */}
        <FormControl size="small" className="w-full md:w-1/4">
          <InputLabel id="filter-label">Filtrar por</InputLabel>
          <Select
            labelId="filter-label"
            value={filter}
            label="Filtrar por"
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="todos">Todos</MenuItem>
            <MenuItem value="precio_asc">Precio ascendente</MenuItem>
            <MenuItem value="precio_desc">Precio descendente</MenuItem>
            <MenuItem value="nombre_az">Nombre A-Z</MenuItem>
            <MenuItem value="nombre_za">Nombre Z-A</MenuItem>
            <MenuItem value="orden_romano">Orden por número romano</MenuItem>
            <MenuItem value="creacion_desc">Orden de creación (reciente primero)</MenuItem>
            <MenuItem value="creacion_asc">Orden de creación (antiguo primero)</MenuItem>
          </Select>
        </FormControl>

        {/* Botones */}
        <div className="flex gap-2">
          <Tooltip title="Crear nueva materia">
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              size="small"
              onClick={() => setModalOpen(true)}
            >
              Crear
            </Button>
          </Tooltip>
          <Tooltip title="Ver ventas y rendimiento">
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<ShowChartIcon />}
              size="small"
              onClick={() => alert("Funcionalidad de rendimiento pendiente.")}
            >
              Ventas
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* Modal para crear materia */}
      <CrearMateria
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        diplomaturaId={diplomaturaId}
        onCreated={() => {
          setModalOpen(false);     // Cierra el modal
          onReload();              // Dispara la recarga de materias
        }}
      />
    </div>
  );
}

AdministrarMaterias.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  onReload: PropTypes.func.isRequired,
};