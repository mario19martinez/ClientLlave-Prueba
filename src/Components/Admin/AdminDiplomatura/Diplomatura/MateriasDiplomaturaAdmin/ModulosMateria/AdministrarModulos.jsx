import { useState } from "react";
import {
  TextField,
  Button,
  Tooltip,
} from "@mui/material";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SettingsIcon from "@mui/icons-material/Settings";
import PropTypes from "prop-types";
import GestionarModulos from "./GestionarModulos";

export default function AdministrarModulos({ search, setSearch, onModulosChange }) {
  const [isGestionarOpen, setIsGestionarOpen] = useState(false);

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
        onModulosUpdate={onModulosChange}
      />
    </>
  );
}

AdministrarModulos.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  onModulosChange: PropTypes.func,
};