// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function ModulosNivel({ nivelId }) {
  const [modulos, setModulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAlert, setOpenAlert] = useState(false);
  const [openInsufficientAccessAlert, setOpenInsufficientAccessAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModulos = async () => {
      try {
        const response = await axios.get(`/niveles/${nivelId}/modulos`);
        setModulos(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los módulos:", error);
        setLoading(false);
      }
    };
    fetchModulos();
  }, [nivelId]);

  useEffect(() => {
    const fetchClases = async (moduloId) => {
      try {
        const response = await axios.get(`/modulo/${moduloId}/clases`);
        return response.data.length; // Retorna el número de clases
      } catch (error) {
        console.error("Error al obtener las clases:", error);
        return 0; // Retorna 0 si hay error
      }
    };
    
    const updateModulosWithClasesCount = async () => {
      const updatedModulos = await Promise.all(
        modulos.map(async (modulo) => {
          const clasesCount = await fetchClases(modulo.id);
          return { ...modulo, clasesCount };
        })
      );
      setModulos(updatedModulos); // Actualiza los módulos después de obtener los conteos de clases
    };

    // Actualiza los conteos de clases solo si hay módulos y se está cargando
    if (modulos.length > 0 && loading) {
      updateModulosWithClasesCount();
    }
  }, [modulos, loading]);

  // Función para truncar la descripción a 150 caracteres
  const truncateDescription = (description) => {
    if (description.length > 150) {
      return description.slice(0, 150) + "...";
    }
    return description;
  };

  // Función para manejar el clic en un módulo
  const handleClickModulo = async (moduloId) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const storedEmail = localStorage.getItem("email");

    if (isLoggedIn === null || isLoggedIn === "false") {
      setOpenAlert(true); // Mostrar mensaje emergente
    } else {
      try {
        const response = await axios.get(`/nivel/${nivelId}/usuarios`);
        const usuariosInscritos = response.data.map(user => user.email);

        if (usuariosInscritos.includes(storedEmail)) {
          navigate(`/home/nivel/${nivelId}/modulo/${moduloId}`);
        } else {
          setOpenInsufficientAccessAlert(true);
        }
      } catch (error) {
        console.error("Error al obtener los usuarios inscritos en el nivel:", error);
        setOpenInsufficientAccessAlert(true);
      }
    }
  };

  // Función para cerrar el mensaje emergente
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  // Función para cerrar el mensaje emergente de acceso insuficiente
  const handleCloseInsufficientAccessAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenInsufficientAccessAlert(false);
  };

  return (
    <div className="">
      <h1 className="text-3xl font-semibold mb-4">Modulos</h1>
      <div>
        {modulos.map((modulo) => (
          <div
            key={modulo.id}
            className={`bg-white hover:bg-gray-300 shadow-lg shadow-blue-800/50 p-4 rounded-lg border-t-4 border-blue-500 hover:border-gray-200 transition-transform transform hover:-translate-y-1 last:mr-0 mb-4`}
            onClick={() => handleClickModulo(modulo.id)}
            style={{ cursor: "pointer" }}
          >
            <div>
              <h2 className="text-lg font-semibold mb-2">{modulo.titulo}</h2>
              <p className="text-gray-600">{truncateDescription(modulo.descripcion)}</p>
              {/* Mostrar el número de clases si está disponible */}
              <p className="text-gray-600">{modulo.clasesCount !== undefined ? `${modulo.clasesCount} Clases` : "Cargando..."} </p>
            </div>
          </div>
        ))}
      </div>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Alineación del mensaje emergente
      >
        <MuiAlert onClose={handleCloseAlert} severity="warning" sx={{ width: "100%", borderRadius: 0, fontSize: "1.5rem", padding: "1.5rem" }}>
          Debe iniciar sesión para poder ver los módulos.
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={openInsufficientAccessAlert}
        autoHideDuration={6000}
        onClose={handleCloseInsufficientAccessAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Alineación del mensaje emergente
      >
        <MuiAlert onClose={handleCloseInsufficientAccessAlert} severity="error" sx={{ width: "100%", borderRadius: 0, fontSize: "1.5rem", padding: "1.5rem" }}>
          No tiene acceso a este módulo. Debes estar registrado en el nivel.
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

ModulosNivel.propTypes = {
  nivelId: PropTypes.string.isRequired,
};

export default ModulosNivel;