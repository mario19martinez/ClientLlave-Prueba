// eslint-disable-next-line no-unused-vars
import React, { useState, useContext, useEffect } from "react";
import { AddPhotoAlternate } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../../Redux/features/Users/usersSlice";
import UploadWidget from "../../UploadWidget/UploadWidget";
import axios from "axios";

const Publicacion = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.userData);
  const storedEmail = localStorage.getItem("email");
  const authToken = localStorage.getItem("token");

  console.log("Este es el token: ", authToken);

  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (storedEmail) {
      dispatch(getUserData(storedEmail));
    }
  }, [dispatch, storedEmail]);

  const handlePostPublish = async () => {
    try {
      if (!authToken) {
        console.error("No hay token disponible.");
        return;
      }

      if (!content.trim() && !image) {
        console.error("Contenido y/o imagen requeridos para publicar.");
        return;
      }

      const postData = {
        content: content,
        image: image, // Utilizar directamente la URL de la imagen
      };

      const response = await axios.post("/create-post", postData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Publicación creada:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error al publicar:", error);
    }
  };

  const handleImageUpload = (selectedImage, previewImage) => {
    setImage(selectedImage);
    setImagePreview(previewImage);
  };

  return (
    <div className="shadow-lg rounded-3xl bg-white dark:bg-gray-800 text-black dark:text-white mb-20">
      <div className="container p-5">
        <div className="top flex items-center gap-4">
          <img
            src={
              userData?.image ||
              "https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280.jpg"
            }
            alt=""
            className="w-10 h-10 rounded-full object-cover"
          />
          <input
            type="text"
            placeholder={`Quieres publicar algo ${userData?.name || ""}?`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border-none outline-none bg-transparent w-3/4 text-black dark:text-white"
          />
        </div>
        <hr className="my-5 border-t border-gray-300 dark:border-gray-600" />
        <div className="bottom flex justify-between items-center">
          <div className="left flex items-center gap-4">
            <UploadWidget
              onImageUpload={handleImageUpload}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Vista previa"
                style={{ width: "50px", height: "50px", borderRadius: "5px" }}
              />
            )}
          </div>
          <div className="right">
            <button
              onClick={handlePostPublish}
              className="px-3 py-1 bg-blue-500 text-white rounded-md"
            >
              Publicar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publicacion;
