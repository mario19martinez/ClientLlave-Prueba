/* eslint-disable no-unused-vars */
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { FaPrayingHands } from "react-icons/fa";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import { motion } from "framer-motion";

export default function ComponentesProfeticos() {
    const h1Styles = {
        textAlign: 'center',
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#012677',
        marginTop: '20px',
        marginBottom: '20px',
      };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 style={h1Styles}>Entrenando Tus Sentidos Espirituales</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Card style={{ backgroundColor: '#00b4fc' }}>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <FaPrayingHands size={48} className="text-white" />
              <Typography variant="h6" className="ml-4 text-white font-semibold">Oremos Juntos</Typography>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Card style={{ backgroundColor: '#005bc5' }}>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <HeadphonesIcon sx={{ fontSize: 48, color: 'white' }} />
              <Typography variant="h6" className="ml-4 text-white font-semibold">Capsulas Profeticas</Typography>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
