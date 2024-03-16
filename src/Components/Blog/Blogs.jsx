// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import CardBlog from "./CardBlog";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controlar la carga
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/blogs");
        const reversedBlogs = response.data.reverse();
        setBlogs(reversedBlogs);
        setLoading(false); // Cambia el estado de carga a falso cuando se completan los blogs
      } catch (error) {
        console.error("Hubo un error al obtener los blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? ( // Muestra el mensaje de carga y la animación si loading es verdadero
        <div className="flex justify-center items-center h-48">
          <p className="text-lg font-bold">Cargando blogs...</p>
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {currentBlogs.map((blog) => (
              <CardBlog key={blog.id} blog={blog} />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            {Array.from(
              { length: Math.ceil(blogs.length / blogsPerPage) },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`mx-2 px-3 py-1 rounded ${
                    i + 1 === currentPage
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;