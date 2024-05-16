import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function PlantillasCursos({ campeinId }) {
  const Template3 = 3;
  const Template4 = 4;
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8 px-4">
      <button
        onClick={() =>
          navigate(`/Admin/campain/landing/SelecForm/${campeinId}`)
        }
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Atrás
      </button>
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <img
            className="w-full h-48 object-cover object-center"
            src="https://via.placeholder.com/500"
            alt="Plantilla 1"
          />
          <div className="px-6 py-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Plantilla 1</h2>
              <div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2">
                  Vista previa
                </button>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() =>
                    navigate(
                      `/Admin/campain/createLanding/cursos/${campeinId}/${Template3}`
                    )
                  }
                >
                  Seleccionar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <img
            className="w-full h-48 object-cover object-center"
            src="https://via.placeholder.com/500"
            alt="Plantilla 2"
          />
          <div className="px-6 py-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Plantilla 2</h2>
              <div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2">
                  Vista previa
                </button>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() =>
                    navigate(
                      `/Admin/campain/createLanding/cursos/${campeinId}/${Template4}`
                    )
                  }
                >
                  Seleccionar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

PlantillasCursos.propTypes = {
  campeinId: PropTypes.string.isRequired,
};