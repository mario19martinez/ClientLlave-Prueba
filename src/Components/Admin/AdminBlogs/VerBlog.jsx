import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { FiShare2, FiCheck, FiCopy } from "react-icons/fi";

const VerBlog = () => {
  const { blogId } = useParams();
  const [blogDetails, setBlogDetails] = useState(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [blogUrl, setBlogUrl] = useState("");

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`/blogs/${blogId}`);
        setBlogDetails(response.data);
      } catch (error) {
        console.error("Hubo un error al obtener los detalles del blog:", error);
      }
    };

    if (blogId) {
      fetchBlogDetails();
      setBlogUrl(`${window.location.origin}/blog/${blogId}`);
    }
  }, [blogId]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(blogUrl).then(() => {
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-8 overflow-y-auto px-4">
      {blogDetails && (
        <div className="bg-white rounded-lg overflow-hidden shadow-lg p-8">
          <div className="mb-4">
            <button
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            >
              <FiShare2 className="mr-2" />
              Obtener URL
            </button>
            {showUrlInput && (
              <div className="mt-4 flex items-center">
                <input
                  type="text"
                  readOnly
                  value={blogUrl}
                  className="w-full p-2 border border-gray-300 rounded-l-md bg-gray-100"
                />
                <button
                  onClick={copyToClipboard}
                  className="bg-blue-500 text-white py-2 px-4 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                >
                  {copySuccess ? <FiCheck /> : <FiCopy />}
                </button>
              </div>
            )}
            {copySuccess && (
              <div className="text-green-500 mt-2">
                <span>Copiado!</span>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-5 py-2 text-gray-600">
              <p>{formatDate(blogDetails.createdAt)}</p>
              <p>
                <strong>{blogDetails.Lectura}</strong>
              </p>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">
            {blogDetails.title}
          </h2>
          {blogDetails.imageUrl && (
            <img
              src={blogDetails.imageUrl}
              alt="Imagen del blog"
              className="w-full mx-auto mb-8 rounded-lg shadow-lg"
              style={{ maxHeight: "400px" }}
            />
          )}
          <div className="text-base lg:text-lg leading-relaxed mb-8 text-gray-700">
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{ __html: blogDetails.content }}
            />
          </div>
          <p className="pb-10 pt-3 text-gray-600">
            <em>{blogDetails.autor}</em>
          </p>
          {blogDetails.embeddedElement && (
            <div
              className="embedded-element"
              dangerouslySetInnerHTML={{ __html: blogDetails.embeddedElement }}
            />
          )}
        </div>
      )}
    </div>
  );
};

VerBlog.propTypes = {
  blogId: PropTypes.string.isRequired,
};

export default VerBlog;