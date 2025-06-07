import { useState } from "react";
import PropTypes from "prop-types";
import { Button, TextField, MenuItem } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SearchIcon from "@mui/icons-material/Search";
import CrearDiplomatura from "./CrearDiplomatura";

export default function AdministrarDiplomatura({ onReload, onSearchChange, onSortChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white px-6 py-6 shadow-md rounded-lg mb-6 border border-blue-100">
      <h2 className="text-lg font-semibold text-gray-700 mb-6">Panel de administración</h2>

      {/* Botones principales */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={() => setIsModalOpen(true)}
          className="!bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold shadow-md px-6 py-2 rounded-full capitalize"
        >
          Crear diplomatura
        </Button>

        <Button
          variant="outlined"
          startIcon={<ShowChartIcon />}
          className="!border-blue-500 !text-blue-600 hover:!bg-blue-50 font-semibold px-5 py-2 rounded-full capitalize"
        >
          Ventas y rendimiento
        </Button>

        <Button
          variant="outlined"
          startIcon={<PeopleAltIcon />}
          className="!border-blue-500 !text-blue-600 hover:!bg-blue-50 font-semibold px-5 py-2 rounded-full capitalize"
        >
          Seguimiento de estudiantes
        </Button>
      </div>

      {/* Buscador y filtros */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="flex-1 w-full">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar diplomatura..."
            onChange={(e) => onSearchChange(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon className="text-gray-500 mr-2" />,
            }}
            size="small"
          />
        </div>

        <div className="w-full md:w-60">
          <TextField
            select
            label="Ordenar por"
            variant="outlined"
            fullWidth
            size="small"
            defaultValue=""
            onChange={(e) => onSortChange(e.target.value)}
          >
            <MenuItem value="">Seleccionar</MenuItem>
            <MenuItem value="recent">Más recientes</MenuItem>
            <MenuItem value="oldest">Más antiguas</MenuItem>
            <MenuItem value="az">A - Z</MenuItem>
            <MenuItem value="za">Z - A</MenuItem>
            <MenuItem value="certified">Con certificación</MenuItem>
            <MenuItem value="nocertified">Sin certificación</MenuItem>
          </TextField>
        </div>
      </div>

      <CrearDiplomatura
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onCreated={onReload}
      />
    </div>
  );
}

AdministrarDiplomatura.propTypes = {
  onReload: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
};