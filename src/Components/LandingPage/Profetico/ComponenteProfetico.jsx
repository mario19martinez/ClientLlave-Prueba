/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";
import BackupIcon from "@mui/icons-material/Backup";
import LanguageIcon from "@mui/icons-material/Language";
import DiamondIcon from "@mui/icons-material/Diamond";
import SettingsIcon from "@mui/icons-material/Settings";

const ComponentesProfeticos = () => {
  const navigate = useNavigate();

  const cardStyles = {
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
    minHeight: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    cursor: "pointer", 
    marginLeft: "20px", 
    marginRight: "20px",
  };

  const iconStyles = {
    fontSize: 48,
    marginBottom: "16px",
  };

  const cardData = [
    {
      title: "Caracter probado y aprobado",
      icon: <BackupIcon sx={iconStyles} />,
      description: [
        "El caracter del profeta",
        "Detonantes del alma que gobierna",
      ],
      color: "#00b4fc",
      route: "/Caracter",
    },
    {
      title: "Doctrina de demonios",
      icon: <LanguageIcon sx={iconStyles} />,
      description: [
        "La verdadera Iglesia Apóstata",
        "¿Los profetas llegaron hasta Juan?",
        "¿Fue Pablo el último Apostol?",
        "¿A solas con el Espíritu Santo?",
        "¿Son Mentoreados los Profetas?",
      ],
      color: "#005bc5",
      route: "/Doctrina",
    },
    {
      title: "Llamamiento y asignación",
      icon: <DiamondIcon sx={iconStyles} />,
      description: [
        "Llamado y Enviados por Dios",
        "Enfocados en la asignación",
      ],
      color: "#00b4fc",
      route: "/Llamamiento",
    },
    {
      title: "Historia Profética",
      icon: <SettingsIcon sx={iconStyles} />,
      description: [
        "Escuela de Profetas en la Biblia",
        "Terminología Bíblica",
        "Hijos de los Profetas",
        "Profetas que mentoraron y entrenaron a Profetas",
      ],
      color: "#005bc5",
      route: "/Historia",
    },
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div style={{ padding: "20px 20px" }}> {/* Añadir padding a la izquierda y a la derecha */}
      <Typography
        variant="h1"
        align="center"
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          color: "#012677",
          marginTop: "20px",
          marginBottom: "40px",
        }}
      >
        Entrenándote para conquistar
      </Typography>
      <Grid container spacing={4}>
        {cardData.map((item, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card
                style={{
                  ...cardStyles,
                  backgroundColor: item.color,
                  color: "white",
                }}
                onClick={() => handleCardClick(item.route)}
              >
                <CardContent style={{ textAlign: "center", flex: 1 }}>
                  {item.icon}
                  <Typography variant="h6" className="font-semibold">
                    {item.title}
                  </Typography>
                  <Typography variant="body1" style={{ marginTop: "10px" }}>
                    {item.description.map((desc, i) => (
                      <Typography key={i} component="div">
                        &bull; {desc}
                      </Typography>
                    ))}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ComponentesProfeticos;