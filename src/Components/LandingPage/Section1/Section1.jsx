// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Fondo1 from './Fondo1.jpg';
import Fondo2 from './Fondo2.jpg';

const images = [Fondo1, Fondo2];
const texts = ['Alcanza tus sueños y metas', 'Alcanza Tus Sueños y metasTu Entrenamiento Profético®Te espera'];

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
      className="relative w-3/4 h-96 mx-auto overflow-hidden rounded-lg shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          background: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <motion.div
          className="p-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <h1 className="text-3xl font-semibold text-white">{texts[index]}</h1>
        </motion.div>
      </div>
      <motion.img
        className="w-full h-full object-cover"
        src={images[index]}
        alt="Background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </motion.div>
  );
};

export default Section1;