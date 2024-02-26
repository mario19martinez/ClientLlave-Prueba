/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";
import BackupIcon from "@mui/icons-material/Backup";
import LanguageIcon from "@mui/icons-material/Language";
import DiamondIcon from "@mui/icons-material/Diamond";
import SettingsIcon from "@mui/icons-material/Settings";
import { motion } from "framer-motion";

export default function ComponentesProfeticos() {

  const navigate = useNavigate();

  const h1Styles = {
    textAlign: "center",
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#012677",
    marginTop: "20px",
    marginBottom: "40px",
  };

  const cardStyles = {
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const cardStylesBlue = {
    ...cardStyles,
    backgroundColor: "#00b4fc",
    color: "white",
  };

  const cardStylesDarkBlue = {
    ...cardStyles,
    backgroundColor: "#005bc5",
    color: "white",
  };

  const iconStyles = {
    fontSize: 48,
    marginBottom: "16px",
  };

  const containerStyles = {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={containerStyles}>
      <h1 style={h1Styles}>Entrenando Tus Sentidos Espirituales</h1>
      <div className="grid grid-cols-2 gap-8">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Card style={cardStylesBlue} onClick={() => navigate("/Caracter")}>
            <CardContent className="flex flex-col items-center justify-center">
              <BackupIcon sx={iconStyles} />
              <Typography
                variant="h6"
                className="font-semibold text-center"
              >
                Caracter probado y aprobado
              </Typography>
              <Typography
                variant="body2"
                className="mt-2 text-center"
              >
                <ul>
                  <li>- El caracter del profeta</li>
                  <li>- Detonantes del alma que gobierna</li>
                </ul>
              </Typography>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Card style={cardStylesDarkBlue} onClick={() => navigate("/Doctrina")}>
            <CardContent className="flex flex-col items-center justify-center">
              <LanguageIcon sx={iconStyles} />
              <Typography
                variant="h6"
                className="font-semibold text-center"
              >
                Doctrina de demonios
              </Typography>
              <Typography
                variant="body2"
                className="mt-2 text-center"
              >
                 <ul>
                  <li>- La verdadera Iglesia Apóstata</li>
                  <li>- ¿Los profetas llegaron hasta Juan?</li>
                  <li>- ¿Fue Pablo el último Apostol?</li>
                  <li>- ¿A solas con el Espíritu Santo?</li>
                  <li>- ¿Son Mentoreados los Profetas?</li>
                </ul>
              </Typography>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Card style={cardStylesBlue} onClick={() => navigate("/Llamamiento")}>
            <CardContent className="flex flex-col items-center justify-center">
              <DiamondIcon sx={iconStyles} />
              <Typography
                variant="h6"
                className="font-semibold text-center"
              >
                Llamamiento y asiganción
              </Typography>
              <Typography
                variant="body2"
                className="mt-2 text-center"
              >
                <ul>
                  <li>- Llamado y Enviados por Dios</li>
                  <li>- Enfocados en la asiganción</li>
                </ul>
              </Typography>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Card style={cardStylesDarkBlue} onClick={() => navigate("/Historia")}>
            <CardContent className="flex flex-col items-center justify-center">
              <SettingsIcon sx={iconStyles} />
              <Typography
                variant="h6"
                className="font-semibold text-center"
              >
                Historia Profética
              </Typography>
              <Typography
                variant="body2"
                className="mt-2 text-center"
              >
                <ul>
                  <li>- Escuela de Profetas en la Biblia</li>
                  <li>- Terminologia Biblica</li>
                  <li>- Hijos de los Profetas</li>
                  <li>- Profetas que mentorearon y entrenaron a Profetas</li>
                </ul>
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}