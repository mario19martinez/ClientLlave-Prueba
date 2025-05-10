import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

export default function CardDiplomatura({ id, name, image, precio, onEdit, onDelete }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/admin/diplomaturas/detalles/${id}`);
  };

  return (
    <div
      className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={handleCardClick}
    >
      {/* Botones arriba con fondo degradado */}
      <div
        className="absolute top-0 left-0 w-full flex justify-end px-2 py-1 bg-gradient-to-b from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <IconButton onClick={() => onEdit(id)} className="text-white hover:text-blue-400" aria-label="Editar diplomatura">
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onDelete(id)} className="text-white hover:text-red-400" aria-label="Eliminar diplomatura">
          <DeleteIcon />
        </IconButton>
      </div>

      {/* Imagen */}
      <img
        src={image || "https://via.placeholder.com/300x150?text=Sin+imagen"}
        alt={name}
        className="w-full h-40 object-cover"
      />

      {/* Información */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>
        {precio !== undefined && (
          <p className="text-blue-600 font-bold mt-1">${Number(precio).toFixed(2)}</p>
        )}
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