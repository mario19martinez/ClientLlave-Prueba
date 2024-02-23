/* eslint-disable no-unused-vars */
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import BackupIcon from "@mui/icons-material/Backup";
import LanguageIcon from "@mui/icons-material/Language";
import DiamondIcon from "@mui/icons-material/Diamond";
import SettingsIcon from "@mui/icons-material/Settings";
import { motion } from "framer-motion";

export default function ComponentesProfeticos() {
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
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  };

  const cardStylesBlue = {
    ...cardStyles,
    backgroundColor: "#00b4fc",
    height: "100%",
  };

  const cardStylesDarkBlue = {
    ...cardStyles,
    backgroundColor: "#005bc5",
    height: "100%",
  };

  const iconStyles = {
    fontSize: 48,
    color: "white",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 style={h1Styles}>Entrenando Tus Sentidos Espirituales</h1>
      <div className="grid grid-cols-2 gap-8">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Card style={cardStylesBlue}>
            <CardContent className="flex flex-col items-center justify-center h-full">
              <BackupIcon sx={iconStyles} />
              <Typography
                variant="h6"
                className="mt-4 text-white font-semibold text-center"
              >
                Con los pies en la tierra y la mirada en el cielo
              </Typography>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Card style={cardStylesDarkBlue}>
            <CardContent className="flex flex-col items-center justify-center h-full">
              <LanguageIcon sx={iconStyles} />
              <Typography
                variant="h6"
                className="mt-4 text-white font-semibold text-center"
              >
                Rompiendo Límites Culturales
              </Typography>
              <Typography
                variant="body2"
                className="text-white mt-2 text-center"
              >
                Condicionamientos provenientes de padres, familia, país, pueblo, educación, y redes sociales.
              </Typography>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Card style={cardStylesBlue}>
            <CardContent className="flex flex-col items-center justify-center h-full">
              <DiamondIcon sx={iconStyles} />
              <Typography
                variant="h6"
                className="mt-4 text-white font-semibold text-center"
              >
                Formando Caracter
              </Typography>
              <Typography
                variant="body2"
                className="text-white mt-2 text-center"
              >
                . <br/>.
              </Typography>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Card style={cardStylesDarkBlue}>
            <CardContent className="flex flex-col items-center justify-center h-full">
              <SettingsIcon sx={iconStyles} />
              <Typography
                variant="h6"
                className="mt-4 text-white font-semibold text-center"
              >
                Trabajando en Disciplina
              </Typography>
              <Typography
                variant="body2"
                className="text-white mt-2 text-center"
              >
                . <br/>.
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}