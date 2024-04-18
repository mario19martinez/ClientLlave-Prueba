// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types'; // Importar PropTypes

export default function TransmisionDetails({ id }) {
    const [transmision, setTransmision] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchTransmision = async () => {
            try {
                const response = await axios.get(`/transmisiones/${id}`);
                if (isMounted) {
                    setTransmision(response.data);
                    setLoading(false);
                }
            } catch (error) {
                if (isMounted) {
                    setError("No se pudo cargar la transmisión. Inténtalo de nuevo más tarde.");
                    setLoading(false);
                }
            }
        };

        if (id) {
            fetchTransmision();
        }

        return () => {
            isMounted = false;
        };
    }, [id]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="text-lg">Cargando detalles de la transmisión...</div>
        </div>;
    }

    if (error) {
        return <div className="text-red-600 text-center mt-4">{error}</div>;
    }

    if (!transmision) {
        return <div className="text-center text-lg mt-4">No se encontraron detalles de la transmisión.</div>;
    }

    const videoId = transmision.urltransmision.split('v=')[1];
    const youtubeUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Detalles de la Transmisión</h2>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl">
                <h3 className="text-xl font-medium text-gray-700 p-4 border-b">{transmision.titulo}</h3>
                <div className="relative overflow-hidden" style={{ paddingBottom: "56.25%" }}>
                    <iframe
                        title="YouTube Transmisión"
                        className="absolute top-0 left-0 w-full h-full"
                        src={youtubeUrl}
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className="p-4 space-y-2">
                    <p className="font-semibold">Estado: <span className={`${transmision.estado ? 'text-green-500' : 'text-red-500'}`}>{transmision.estado ? 'Activo' : 'Inactivo'}</span></p>
                    <p className="font-semibold">Fecha de Transmisión: {transmision.fechaTransmision ? new Date(transmision.fechaTransmision).toLocaleString() : 'No disponible'}</p>
                </div>
            </div>
        </div>
    );
}

TransmisionDetails.propTypes = {
    id: PropTypes.string.isRequired // Define que el prop 'id' debe ser una cadena y es requerido
};