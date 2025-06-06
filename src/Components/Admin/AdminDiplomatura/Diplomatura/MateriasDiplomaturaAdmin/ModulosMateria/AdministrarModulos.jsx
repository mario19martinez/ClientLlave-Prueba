import { useState } from "react";
import {
  TextField,
  Button,
  Tooltip,
  Box,
} from "@mui/material";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SettingsIcon from "@mui/icons-material/Settings";
import PropTypes from "prop-types";
import GestionarModulos from "./GestionarModulos";

export default function AdministrarModulos({ search, setSearch, onClasesChange }) {
  const [isGestionarOpen, setIsGestionarOpen] = useState(false);

  return (
    <>
      <Box className="bg-white shadow-md rounded-xl p-6 w-full mt-6 transition-all duration-300">
        <Box className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {/* Buscador de clases */}
          <TextField
            label="Buscar clases"
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3"
          />

          {/* Botones de acción */}
          <Box className="flex gap-3">
            <Tooltip title="Ver estadísticas de ventas de clases">
              <Button
                variant="outlined"
                color="primary"
                startIcon={<ShowChartIcon />}
                size="small"
                sx={{ borderRadius: "12px", textTransform: "none" }}
              >
                Ventas
              </Button>
            </Tooltip>

            <Tooltip title="Crear, asignar u organizar clases">
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
                  borderRadius: "12px",
                  textTransform: "none",
                }}
              >
                Gestionar Clases
              </Button>
            </Tooltip>
          </Box>
        </Box>
      </Box>

      {/* Modal de gestión de clases */}
      <GestionarModulos
        isOpen={isGestionarOpen}
        onRequestClose={() => setIsGestionarOpen(false)}
        onModulosUpdate={onClasesChange} 
      />
    </>
  );
}

AdministrarModulos.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  onClasesChange: PropTypes.func, 
};