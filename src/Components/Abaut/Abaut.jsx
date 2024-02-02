// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const About = () => {
  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
    // Realizar la solicitud GET para obtener todos los Abouts
    axios.get('/about')
      .then(response => {
        setAbouts(response.data);
      })
      .catch(error => {
        console.error('Error fetching abouts:', error);
      });
  }, []);

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Nosotros</h1>
      {abouts.map(about => (
        <div key={about.id} className="bg-white rounded-lg shadow-md mb-8 p-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-900">{about.titulo}</h3>
          <div
            className="text-base text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: about.content }}
          ></div>
          <hr className="my-6 border-gray-300" />
        </div>
      ))}
    </div>
  );
};

export default About;