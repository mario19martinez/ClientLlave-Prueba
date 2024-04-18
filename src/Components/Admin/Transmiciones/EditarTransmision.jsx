// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, FormControlLabel, Switch
} from '@mui/material'; // Importa los componentes de Material-UI

function EditarTransmision({ showEditModal, selectedId, handleCloseEditModal }) {
    const [titulo, setTitulo] = useState('');
    const [urltransmision, setUrlTransmision] = useState('');
    const [fechaTransmision, setFechaTransmision] = useState('');
    const [estado, setEstado] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!selectedId) return;

        setIsLoading(true);
        axios.get(`/transmisiones/${selectedId}`)
            .then(response => {
                const { titulo, urltransmision, fechaTransmision, estado } = response.data;
                setTitulo(titulo);
                setUrlTransmision(urltransmision);
                setFechaTransmision(fechaTransmision);
                setEstado(estado);
            })
            .catch(error => {
                console.error('Error al cargar los datos de la transmisión', error);
                alert('Error al cargar los datos de la transmisión');
            })
            .finally(() => setIsLoading(false));
    }, [selectedId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log("Datos enviados:", { titulo, urltransmision, fechaTransmision, estado });
        try {
            const response = await axios.put(`/transmisiones/${selectedId}`, {
                titulo,
                urltransmision,
                fechaTransmision,
                estado
            });
            alert('Transmisión actualizada correctamente!');
            handleCloseEditModal(); // Cierra el modal de edición
            console.log('Respuesta del servidor:', response.data); // Log de la respuesta
        } catch (error) {
            console.error('Error al actualizar la transmisión', error);
            alert('Error al actualizar la transmisión');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <p className="text-center">Cargando...</p>;

    return (
        <Dialog open={showEditModal} onClose={handleCloseEditModal} maxWidth="sm" fullWidth>
            <DialogTitle>Editar Transmisión</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <TextField
                        label="Título"
                        variant="outlined"
                        fullWidth
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                    <TextField
                        label="URL de Transmisión"
                        variant="outlined"
                        fullWidth
                        value={urltransmision}
                        onChange={(e) => setUrlTransmision(e.target.value)}
                    />
                    <TextField
                        label="Fecha de Transmisión"
                        type="datetime-local"
                        variant="outlined"
                        fullWidth
                        value={fechaTransmision}
                        onChange={(e) => setFechaTransmision(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={estado}
                                onChange={(e) => setEstado(e.target.checked)}
                                color="primary"
                            />
                        }
                        label="Estado"
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseEditModal} style={{ color: 'red' }}>
                    Cancelar
                </Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Actualizar Transmisión
                </Button>
            </DialogActions>
        </Dialog>
    );
}

EditarTransmision.propTypes = {
    showEditModal: PropTypes.bool.isRequired,
    selectedId: PropTypes.number.isRequired,
    handleCloseEditModal: PropTypes.func.isRequired
};

export default EditarTransmision;