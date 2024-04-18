// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import Switch from '@mui/material/Switch'; // Importamos el Switch de Material UI
import FormControlLabel from '@mui/material/FormControlLabel'; // Importamos para manejar el label del switch

export default function CrearTransmision() {
    // Estado del formulario
    const [formData, setFormData] = useState({
        urltransmision: '',
        estado: false,
        titulo: '',
        fechaTransmision: ''
    });

    // Manejar cambios en los inputs del formulario
    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    // Enviar los datos al servidor
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        try {
            const response = await axios.post('/transmisiones', formData);
            alert('Transmisión creada correctamente!');
            console.log(response.data);
        } catch (error) {
            console.error("Hubo un error al crear la transmisión", error.response);
            alert('Error al crear la transmisión');
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4 shadow rounded bg-white">
            <h2 className="text-xl font-semibold mb-4">Crear Transmisión</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Título:
                        <input
                            type="text"
                            name="titulo"
                            value={formData.titulo}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        URL de Transmisión:
                        <input
                            type="text"
                            name="urltransmision"
                            value={formData.urltransmision}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </label>
                </div>
                <div>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={formData.estado}
                                onChange={handleChange}
                                name="estado"
                                color="primary"
                            />
                        }
                        label="Estado"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Fecha de Transmisión:
                        <input
                            type="datetime-local"
                            name="fechaTransmision"
                            value={formData.fechaTransmision}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </label>
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Crear Transmisión
                </button>
            </form>
        </div>
    );
}
