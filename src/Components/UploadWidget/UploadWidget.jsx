import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

//const { VITE_CLOUND_NAME, VITE_UPLOAD_PRESENT } = import.meta.env;

const UploadWidget = ({ onImageUpload }) => {
  const { VITE_CLOUND_NAME, VITE_UPLOAD_PRESENT } = import.meta.env || {};
  const cloundName = VITE_CLOUND_NAME || "valor_predeterminado";
  const uploadPreset = VITE_UPLOAD_PRESENT || "valor_predeterminado";

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
        }
        console.log(result);
      }
    );
  }, [onImageUpload, cloundName, uploadPreset]);

  return (
    <button
      className="bg-blue-500 text-white font-hammersmithOne w-24 mt-2"
      onClick={() => widgetRef.current.open()}
    >
      Cargar
    </button>
  );
};

UploadWidget.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
};
export default UploadWidget;
