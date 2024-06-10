import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../../Redux/features/Users/usersSlice";
import UploadWidget from "../../UploadWidget/UploadWidget";
import axios from "axios";

const Publicacion = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.userData);
  const storedEmail = localStorage.getItem("email");
  const authToken = localStorage.getItem("token");

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
        image: image,
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
    <div className="shadow-lg rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 mb-8 mx-4 md:mx-auto md:max-w-2xl">
      <div className="p-5">
        <div className="flex items-center gap-4">
          <img
            src={
              userData?.image ||
              "https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280.jpg"
            }
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <input
            type="text"
            placeholder={`¿Quieres publicar algo, ${userData?.name || ""}?`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border-none outline-none bg-transparent w-full text-gray-800 dark:text-gray-200"
          />
        </div>
        {imagePreview && (
          <div className="my-4">
            <img
              src={imagePreview}
              alt="Vista previa"
              className="w-full h-auto rounded-md object-cover"
            />
          </div>
        )}
        <hr className="my-4 border-t border-gray-300 dark:border-gray-700" />
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer">
            <UploadWidget onImageUpload={handleImageUpload} />
          </div>
          <button
            onClick={handlePostPublish}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Publicar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Publicacion;