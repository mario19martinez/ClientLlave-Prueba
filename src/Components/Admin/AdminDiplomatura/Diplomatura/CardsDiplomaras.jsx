import PropTypes from "prop-types";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { useNavigate } from "react-router-dom";

export default function CardDiplomatura({ id, name, image, precio, onEdit, onDelete }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/admin/diplomaturas/detalles/${id}`);
  };

  const handleStopPropagation = (e) => e.stopPropagation();

  return (
    <div
      className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={handleNavigate}
    >
      {/* Imagen de portada */}
      <img
        src={image || "https://via.placeholder.com/300x150?text=Sin+imagen"}
        alt={name}
        className="w-full h-40 object-cover"
      />

      {/* Contenido */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>
        {precio !== undefined && (
          <p className="text-blue-600 font-bold mt-1">${Number(precio).toFixed(2)}</p>
        )}

        {/* Botones (visibles en hover) */}
        <div
          className="flex justify-end gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={handleStopPropagation}
        >
          <Tooltip title="Ver ventas" arrow>
            <IconButton
              size="small"
              className="text-gray-600 hover:text-blue-500"
              aria-label="Ver ventas"
            >
              <ShowChartIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Editar diplomatura" arrow>
            <IconButton
              size="small"
              onClick={() => onEdit(id)}
              className="text-gray-600 hover:text-blue-500"
              aria-label="Editar diplomatura"
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Eliminar diplomatura" arrow>
            <IconButton
              size="small"
              onClick={() => onDelete(id)}
              className="text-gray-600 hover:text-red-500"
              aria-label="Eliminar diplomatura"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

CardDiplomatura.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  precio: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};