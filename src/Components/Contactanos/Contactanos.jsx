// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { toast } from "react-toastify";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    reseña: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validacion de formulario (aqui puedes agregar tus propias validaciones)
    if (!formData.nombre || !formData.correo || !formData.reseña) {
      toast.error("Completa todos los campos.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: false,
        theme: "colored",
      });
    } else {
      toast.success("Se Envio Exitosamente.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: false,
        theme: "colored",
      });
    }
  };

  return (
    <div className=" border-4 border-blue-400 border-double w-2/5 h-screen m-10 bg-blue-900 text-white inset-0 grid justify-items-center pb-8">
      <h1 className="text-2xl font-semibold mb-4 pt-6">Contactanos</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-center">
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-white">
            Nombre:{" "}
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border text-white bg-blue-500 rounded-md focus:outline-none focus:border-blue-500 flex justify-center"
          />
        </div>
        <br />

        <div className="mb-4">
          <label htmlFor="correo" className="block text-white">
            Correo:{" "}
          </label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border bg-blue-500 text-white rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <br />

        <div className="mb-4">
          <label htmlFor="reseña" className="block text-white">
            Reseña:{" "}
          </label>
          <textarea
            name="reseña"
            id="reseña"
            cols="50"
            rows="4"
            value={formData.reseña}
            onChange={handleChange}
            className="w-full px-3 py-2 border bg-blue-500 text-white rounded-md focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        <br />

        <div className="mb-4 grid justify-items-center">
          <button
            type="submit"
            className="bg-white hover:bg-blue-200 text-blue-900 font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-500"
          >
            Enviar
          </button>
        </div>
      </form>

      <p className="text-center text-white ">
        ¿Tienes alguna pregunta? ¡Contactanos por WhatsApp!
      </p>
      <a
        href="https://api.whatsapp.com/send?phone=573126023309"
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center bg-green-600 text-white py-2 px-20 rounded-md hover:bg-green-700"
      >
        WhatsApp <WhatsAppIcon />
      </a>
    </div>
  );
}

export default ContactForm;
