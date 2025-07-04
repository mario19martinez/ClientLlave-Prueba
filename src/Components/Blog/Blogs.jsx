import { useState, useEffect } from "react";
import axios from "axios";
import CardBlog from "./CardBlog";
import CircularProgress from "@mui/material/CircularProgress";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/blogs");
        const sortedBlogs = response.data.sort((a, b) => b.id - a.id);
        setBlogs(sortedBlogs);
        setLoading(false);
      } catch (error) {
        console.error("Hubo un error al obtener los blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(
    (blog) => blog.estado === "publicado" || !blog.estado
  );

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="text-center">
            <p className="text-gray-600 mt-4 font-semibold">
              Cargando Blogs...
            </p>
            <CircularProgress />
          </div>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg font-semibold">
            No hay blogs disponibles.
          </p>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 transition-transform duration-500">
            {currentBlogs.map((blog) => (
              <CardBlog key={blog.id} blog={blog} />
            ))}
          </div>
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from(
              { length: Math.ceil(filteredBlogs.length / blogsPerPage) },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`mx-1 px-3 py-2 rounded-full transition-colors duration-300 ${
                    i + 1 === currentPage
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
