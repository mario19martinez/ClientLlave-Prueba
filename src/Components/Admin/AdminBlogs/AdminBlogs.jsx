// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from "react";
import CardAdminBlogs from "./CardAdminBlogs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9; // Mostrar solo 9 blogs por página

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/blogs");
        const sortedBlogs = response.data.sort((a, b) => b.id - a.id); // Ordenar blogs por ID descendente
        setBlogs(sortedBlogs);
      } catch (error) {
        console.error("Error al obtener blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Administrar Blogs</h2>
      <button
        onClick={() => navigate("/Editor/Blogs/CrearBlog")}
        className="bg-green-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Crear Nuevo Blog
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {currentBlogs.map((blog) => (
          <CardAdminBlogs
            key={blog.id}
            imageUrl={blog.imageUrl}
            title={blog.title}
            blogId={blog.id}
            estado={blog.estado}
          />
        ))}
      </div>

      <div className="mt-4">
        {Array.from(
          { length: Math.ceil(blogs.length / blogsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-3 py-1 mr-2 rounded-md ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default AdminBlogs;