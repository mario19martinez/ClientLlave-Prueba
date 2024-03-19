// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams, useNavigate } from "react-router-dom";
import paisesBanderas from './banderas.json';

export default function EditEgresados() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState("");
  const [template, setTemplate] = useState("");
  const [flag, setFlag] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchEgresado = async () => {
      try {
        const response = await axios.get(`/egresados/${id}`);
        const egresado = response.data;
        setName(egresado.name);
        setContent(egresado.content);
        setMedia(egresado.media);
        setTemplate(egresado.template);
        setFlag(egresado.flag);
      } catch (error) {
        console.error("Error fetching egresado:", error);
      }
    };

    fetchEgresado();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`/egresados/${id}`, { name, content, media, template, flag });
      setOpenSnackbar(true);
      navigate("/admin/Egresados");
    } catch (error) {
      console.error("Error updating egresado:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
      <div className="pb-5 justify-start">
        <button
          onClick={() => navigate("/admin/Egresados")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Atras
        </button>
      </div>
      <h4 className="text-xl font-semibold mb-4">Editar Egresado</h4>
      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-gray-700">
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-gray-700">
            Contenido:
          </label>
          <div className="border border-gray-200 rounded-md">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={{
                toolbar: [
                  [{ 'header': '1'}, {'header': '2'}, {'font': []}],
                  [{size: []}],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                  ['link'],
                  ['clean'],
                  [{ 'align': [] }],
                  [{ 'color': [] }, { 'background': [] }],
                ],
              }}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              style={{ minHeight: '200px' }}
            />
          </div>
        </div>
        <div>
          <label htmlFor="media" className="block text-gray-700">
            Media:
          </label>
          <input
            type="text"
            id="media"
            value={media}
            onChange={(e) => setMedia(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="flag" className="block text-gray-700">
            Bandera:
          </label>
          <select
            id="flag"
            value={flag}
            onChange={(e) => setFlag(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="">Seleccione una bandera</option>
            {paisesBanderas.banderasPaises.map((paisBandera, index) => (
              <option key={index} value={paisBandera.bandera}>
                {paisBandera.pais}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="template" className="block text-gray-700">
            Template:
          </label>
          <select
            id="template"
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="1">Template 1</option>
            <option value="2">Template 2</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Guardar cambios
        </button>
      </form>
      {openSnackbar && (
        <div className="absolute top-0 right-0 mt-16 mr-4">
          <div className="bg-green-500 text-white font-bold px-4 py-2 rounded">
            El egresado ha sido actualizado con éxito
          </div>
        </div>
      )}
    </div>
  );
}
