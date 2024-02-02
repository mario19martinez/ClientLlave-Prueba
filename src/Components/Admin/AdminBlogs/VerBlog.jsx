// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

const VerBlog = () => {
  const { blogId } = useParams();
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

  return (
    <div className="max-w-3xl mx-auto py-8 overflow-y-auto">
      {blogDetails && (
        <div className="bg-white rounded-lg overflow-hidden shadow-lg p-8">
          <h2 className="text-4xl font-bold text-center mb-6">
            {blogDetails.title}
          </h2>
          {blogDetails.imageUrl && (
            <img
              src={blogDetails.imageUrl}
              alt="Imagen del blog"
              className="w-3/5 md:w-full mx-auto mb-8 rounded-lg shadow-lg"
              style={{ maxHeight: "400px" }}
            />
          )}
          <div className="text-base lg:text-lg leading-relaxed mb-8">
            {/* Utilizando dangerouslySetInnerHTML para renderizar contenido HTML */}
            <div dangerouslySetInnerHTML={{ __html: blogDetails.content }} />
          </div>
          {/* Renderizar embeddedElement */}
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
