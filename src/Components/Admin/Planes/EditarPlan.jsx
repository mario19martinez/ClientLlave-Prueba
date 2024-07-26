import { useState, useEffect } from "react";
import axios from "axios";

export default function EditarPlan({ planId, onSuccess, onError }) {
  const [formData, setFormData] = useState({
    name: "",
    esquema: "",
    descripcion: "",
    Precio: "",
    porcentaje_descuento: "",
    descuento: false,
    activo: false,
  });

  const [tags, setTags] = useState([]);
  const [precioConDescuento, setPrecioConDescuento] = useState("");

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await axios.get(`/plan/${planId}`);
        const plan = response.data;
        setFormData(plan);
        setTags(
          plan.esquema
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag)
        );
      } catch (error) {
        console.error("Error al obtener el plan:", error);
      }
    };

    if (planId) {
      fetchPlan();
    }
  }, [planId]);

  useEffect(() => {
    if (formData.descuento && formData.Precio && formData.porcentaje_descuento) {
      const precio = parseFloat(formData.Precio);
      const porcentaje = Math.min(parseInt(formData.porcentaje_descuento, 10), 100);
      if (!isNaN(precio) && !isNaN(porcentaje)) {
        const descuento = (precio * porcentaje) / 100;
        setPrecioConDescuento((precio - descuento).toFixed(2));
      }
    } else {
      setPrecioConDescuento("");
    }
  }, [formData.descuento, formData.Precio, formData.porcentaje_descuento]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "porcentaje_descuento") {
      // Allow only numbers and handle max limit
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData({
        ...formData,
        [name]: numericValue <= 100 ? numericValue : 100,
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleEsquemaChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      esquema: value,
    });
    setTags(
      value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag)
    );
  };

  const handleTagRemove = (tagToRemove) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    setFormData({
      ...formData,
      esquema: newTags.join(", "),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const esquemaString = tags.join(",");
    const updatedFormData = { ...formData, esquema: esquemaString };

    try {
      const response = await axios.put(`/plan/${planId}`, updatedFormData);
      onSuccess(response.data);
    } catch (error) {
      onError(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-4 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Editar Plan</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="esquema">
            Esquema
          </label>
          <textarea
            id="esquema"
            name="esquema"
            value={formData.esquema}
            onChange={handleEsquemaChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Ingresa los elementos separados por coma"
            rows="4"
          />
          <div className="mt-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-blue-200 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleTagRemove(tag)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
            Descripción
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            rows="4"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Precio">
            Precio
          </label>
          <input
            type="text"
            id="Precio"
            name="Precio"
            value={formData.Precio}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="porcentaje_descuento">
            Porcentaje de Descuento
          </label>
          <div className="flex items-center">
            <input
              type="text"
              id="porcentaje_descuento"
              name="porcentaje_descuento"
              value={formData.porcentaje_descuento}
              onChange={handleChange}
              className="w-3/4 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              disabled={!formData.descuento}
              placeholder="Ej. 10"
              pattern="[0-9]*"
            />
            {formData.descuento && (
              <span className="ml-2 text-gray-700">%</span>
            )}
          </div>
          <p className="text-gray-500 text-xs mt-1">
            Solo se permiten números enteros entre 0 y 100.
          </p>
        </div>
        {formData.descuento && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Precio con Descuento
            </label>
            <p className="text-lg font-bold text-blue-600">
              {precioConDescuento ? `$${precioConDescuento}` : '0.00'}
            </p>
          </div>
        )}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="descuento"
              checked={formData.descuento}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Descuento</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="activo"
              checked={formData.activo}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Activo</span>
          </label>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}