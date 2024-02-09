// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; 
import Fondo1 from './Fondo1.jpg';
import Fondo2 from './Fondo2.jpg';

const images = [Fondo1, Fondo2];
const texts = ['Alcanza tus sueños y metas', 'Alcanza Tus Sueños y metas Tu Entrenamiento Profético®Te espera'];

const Section1 = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(changeContent, 5000);
    return () => clearInterval(interval);
  }, [index]);

  const changeContent = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <motion.div
      className="relative w-screen h-96 overflow-hidden rounded-lg shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <motion.div
          className="p-6 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4">{texts[index]}</h1>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 md:px-10 md:py-4 bg-blue-600 text-white rounded-full focus:outline-none hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            <Link to="/RegistroUser">Regístrate ahora</Link>
          </motion.button>
        </motion.div>
      </div>
      <motion.img
        className="w-full h-full object-cover"
        src={images[index]}
        alt="Background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
    </motion.div>
  );
};

export default Section1;