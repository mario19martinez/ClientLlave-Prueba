import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const Blog = ({ blogId }) => {
  const [blogDetails, setBlogDetails] = useState(null);

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
    }
  }, [blogId]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {blogDetails && (
        <div className="bg-white rounded-lg overflow-hidden shadow-lg p-8">
          <div className="flex justify-between items-center mb-4 text-gray-600">
            <span className="text-sm">{formatDate(blogDetails.createdAt)}</span>
            {blogDetails.autor && (
              <span className="text-sm bg-blue-100 text-blue-800 py-1 px-3 rounded-full">
                {blogDetails.autor}
              </span>
            )}
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
          {blogDetails.Lectura && (
            <div className="flex justify-center items-center text-gray-600 mt-4">
              <span className="text-sm">
                Tiempo estimado de lectura: {blogDetails.Lectura}
              </span>
            </div>
          )}
          <div className="text-base lg:text-lg leading-relaxed text-gray-700 mb-8">
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{ __html: blogDetails.content }}
            />
          </div>
          {blogDetails.autor && (
            <p className="italic text-gray-600">{blogDetails.autor}</p>
          )}
          {blogDetails.embeddedElement && (
            <div
              className="embedded-element mt-8"
              dangerouslySetInnerHTML={{ __html: blogDetails.embeddedElement }}
            />
          )}
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blogId: PropTypes.string.isRequired,
};

export default Blog;