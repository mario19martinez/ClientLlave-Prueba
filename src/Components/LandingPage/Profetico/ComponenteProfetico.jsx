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

    const cardStylesBlue = {
        backgroundColor: '#00b4fc',
        height: '100%',
    };

    const cardStylesDarkBlue = {
        backgroundColor: '#005bc5',
        height: '100%',
    };

    const iconStyles = {
        fontSize: 48,
        color: 'white',
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 style={h1Styles}>Entrenando Tus Sentidos Espirituales</h1>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Card style={cardStylesBlue}>
                        <CardContent className="flex flex-col items-center justify-center py-6">
                            <FaPrayingHands size={48} className="text-white" />
                            <Typography variant="h6" className="ml-4 text-white font-semibold">Oremos Juntos</Typography>
                            <Typography variant="body2" className="text-white mt-2">Descripción azul sobre Oremos Juntos.</Typography>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Card style={cardStylesDarkBlue}>
                        <CardContent className="flex flex-col items-center justify-center py-6">
                            <HeadphonesIcon sx={iconStyles} />
                            <Typography variant="h6" className="ml-4 text-white font-semibold">Capsulas Profeticas</Typography>
                            <Typography variant="body2" className="text-white mt-2">Descripción azul sobre Capsulas Profeticas.</Typography>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Card style={cardStylesBlue}>
                        <CardContent className="flex flex-col items-center justify-center py-6">
                            <FaPrayingHands size={48} className="text-white" />
                            <Typography variant="h6" className="ml-4 text-white font-semibold">Título 3</Typography>
                            <Typography variant="body2" className="text-white mt-2">Descripción azul sobre Título 3.</Typography>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Card style={cardStylesDarkBlue}>
                        <CardContent className="flex flex-col items-center justify-center py-6">
                            <HeadphonesIcon sx={iconStyles} />
                            <Typography variant="h6" className="ml-4 text-white font-semibold">Título 4</Typography>
                            <Typography variant="body2" className="text-white mt-2">Descripción azul sobre Título 4.</Typography>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
