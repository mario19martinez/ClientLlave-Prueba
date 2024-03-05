import { Link } from "react-router-dom";
import { Stack } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function NivelesCard({ id, image, name, costo }) {
  return (
    <div className="max-w-xs bg-white shadow-lg rounded-md overflow-hidden mx-auto border-2 border-blue-400">
      <Link to={`/niveldetail/${id}`}>
        <img src={image} alt={name} className="object-contain w-full h-64" />
        <div className="px-6 py-4">
          <div>
            <h1 className="font-bold text-xl mb-2 text-gray-800">{name}</h1>
          </div>
          <Stack>
            <div className="flex flex-no-wrap bg-gray-300 p-2 pt-2 pl-2 pr-2">
              <div className="px-6 py-2 flex-1 text-gray-700 text-base font-semibold">
                {costo}
              </div>
              <div className="flex items-center">
                <span
                  //onClick={notify}
                  className="cursor-pointer bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
                >
                  Agregar al Carrito
                  <AddShoppingCartIcon className="text-white text-2xl" />
                </span>
              </div>
            </div>
          </Stack>
        </div>
      </Link>
    </div>
  );
}

export default NivelesCard;
