import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { AddPhotoAlternate } from "@mui/icons-material";

const UploadWidget = ({ onImageUpload }) => {
  const { VITE_CLOUND_NAME, VITE_UPLOAD_PRESENT } = import.meta.env || {};
  const cloundName = VITE_CLOUND_NAME || "valor_predeterminado";
  const uploadPreset = VITE_UPLOAD_PRESENT || "valor_predeterminado";

  const [imagePreview, setImagePreview] = useState(null);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: cloundName,
        uploadPreset: uploadPreset,
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          if (typeof onImageUpload === "function") {
            onImageUpload(result.info.secure_url);
          }
          setImagePreview(result.info.secure_url);
        }
        //console.log(result);
      }
    );
  }, [onImageUpload, cloundName, uploadPreset]);

  return (
    <div className="flex flex-col items-center">
      <button
        className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded-md shadow-md transition-colors duration-200"
        onClick={() => widgetRef.current.open()}
      >
        <AddPhotoAlternate fontSize="small" className="mr-1" />
        <span className="text-sm">Subir imagen</span>
      </button>
      {imagePreview && (
        <div className="mt-2 w-24 h-24">
          <img src={imagePreview} alt="Previsualización" className="w-full h-full object-cover rounded-md shadow-md" />
        </div>
      )}
    </div>
  );
};

UploadWidget.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
};

export default UploadWidget;