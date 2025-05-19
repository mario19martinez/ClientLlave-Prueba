import { useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Tooltip,
} from "@mui/material";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SettingsIcon from "@mui/icons-material/Settings";
import PropTypes from "prop-types";
import GestionarModulos from "./GestionarModulos";

export default function AdministrarModulos({ search, setSearch, filter, setFilter, onModulosChange }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [isGestionarOpen, setIsGestionarOpen] = useState(false);

  const handleFilterChange = (e) => {
    setSelectedOption(e.target.value);
    setFilter(e.target.value);
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-6 w-full mt-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {/* Buscador */}
          <TextField
            label="Buscar módulos"
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3"
          />

          {/* Filtro */}
          <FormControl size="small" className="w-full md:w-1/4">
            <InputLabel id="filter-modulo-label">Filtrar por</InputLabel>
            <Select
              labelId="filter-modulo-label"
              value={selectedOption}
              label="Filtrar por"
              onChange={handleFilterChange}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="nombre_az">Nombre A-Z</MenuItem>
              <MenuItem value="nombre_za">Nombre Z-A</MenuItem>
              <MenuItem value="precio_asc">Precio ascendente</MenuItem>
              <MenuItem value="precio_desc">Precio descendente</MenuItem>
              <MenuItem value="creacion_desc">Más recientes</MenuItem>
            </Select>
          </FormControl>

          {/* Botones */}
          <div className="flex gap-2">
            <Tooltip title="Ver estadísticas de ventas de módulos">
              <Button
                variant="outlined"
                color="primary"
                startIcon={<ShowChartIcon />}
                size="small"
              >
                Ventas
              </Button>
            </Tooltip>

            <Tooltip title="Crear, asignar u ordenar módulos">
              <Button
                variant="contained"
                startIcon={<SettingsIcon />}
                size="small"
                onClick={() => setIsGestionarOpen(true)}
                sx={{
                  backgroundColor: "#3B82F6",
                  "&:hover": {
                    backgroundColor: "#2563EB",
                  },
                  color: "white",
                }}
              >
                Gestionar Módulos
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Modal de gestión de módulos */}
      <GestionarModulos
        isOpen={isGestionarOpen}
        onRequestClose={() => setIsGestionarOpen(false)}
        onModulosUpdate={onModulosChange} // 👈 Prop clave para actualizar
      />
    </>
  );
}

AdministrarModulos.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  onModulosChange: PropTypes.func, 
};
