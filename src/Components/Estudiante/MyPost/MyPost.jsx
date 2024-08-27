import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function MyPost() {
  const [userPosts, setUserPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/my-posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserPosts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        console.error("Error al obtener las publicaciones:", error.message);
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, []); // Solo se ejecuta al montar el componente

  const toggleCommentsVisibility = (postId) => {
    setUserPosts((prevUserPosts) =>
      prevUserPosts.map((post) => {
        if (post.id === postId) {
          return { ...post, showComments: !post.showComments };
        }
        return post;
      })
    );
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = userPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(userPosts.length / postsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (loading){
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="text-center">
          <p className="text-gray-600 mt-4 font-semibold">Cargando Publicaciones...</p>
          <CircularProgress />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="text-center">
          <p className="text-red-500 mt-4 font-semibold">Error: {error}</p>
          <p className="text-red-500 mt-4 font-semibold">Oops! Algo salió mal. Vuelve a intentarlo en un momento.</p>
          <p className="text-red-500 mt-4 font-semibold">
          <SentimentVeryDissatisfiedIcon fontSize="large" />
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-10 md:px-20 lg:px-40 bg-gray-50">
      <div className="mb-8 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-700">Mis Publicaciones</h2>
      </div>
      {userPosts.length === 0 ? (
        <div className="flex flex-col items-center">
          <p className="text-lg text-gray-700 text-center">
            Todavía no has publicado nada en la comunidad.
          </p>
          <button
            onClick={() => navigate("/Comunidad")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 translate-y-10 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform "
          >
            Presiona para ir a la Comunidad
          </button>
        </div>
      ) : (
        <ul className="flex flex-col items-center justify-center">
          {currentPosts.map((post) => (
            <li
              key={post.id}
              className="bg-white shadow-md mb-8 p-6 rounded-md md:w-1/2 md:h-auto"
            >
              <p className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              {post.content && (
                <p className="text-xl font-semibold mb-2">{post.content}</p>
              )}
              {post.image && (
                <img
                  src={post.image}
                  alt="Publicación"
                  className="mb-2 rounded-md"
                />
              )}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600 mb-2">
                    <FavoriteIcon /> {post.likesCount || 0}
                  </p>
                </div>
                <div>
                  {post.showComments ? (
                    <button
                      className="text-gray-600 underline"
                      onClick={() => toggleCommentsVisibility(post.id)}
                    >
                      Ocultar comentarios
                    </button>
                  ) : (
                    <button
                      className="text-gray-600 underline"
                      onClick={() => toggleCommentsVisibility(post.id)}
                    >
                      Ver comentarios ({post.comments.length})
                    </button>
                  )}
                </div>
              </div>
              {post.showComments &&
                post.comments &&
                post.comments.length > 0 && (
                  <div className="mt-4">
                    <ul>
                      {post.comments.map((comment) => (
                        <li
                          key={comment.id}
                          className="text-sm bg-gray-200 p-4 rounded-lg border-b-4 border-gray-300 mb-2"
                        >
                          <div className="flex items-center mt-2">
                            {comment.user.image ? (
                              <img
                                src={comment.user.image}
                                alt="Avatar"
                                className="w-8 h-8 rounded-full mr-2"
                              />
                            ) : (
                              <img
                                src="https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280.jpg"
                                alt="Default Avatar"
                                className="w-8 h-8 rounded-full mr-2"
                              />
                            )}
                            <p className="text-base font-hammersmithOne">
                              {comment.user.name} {comment.user.last_name}
                            </p>
                          </div>
                          <p className="text-base">{comment.content}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </li>
          ))}
        </ul>
      )}

<nav className="mt-2" aria-label="Pagination">
        <ul className="flex justify-center">
          <li>
            <button
              onClick={() =>
                setCurrentPage(currentPage === 1 ? 1 : currentPage - 1)
              }
              disabled={currentPage === 1}
              className={`${
                currentPage === 1
                  ? "bg-gray-200 text-gray-600"
                  : "bg-white hover:bg-gray-50"
              } px-3 py-1 border border-gray-300 rounded-l-md font-medium text-sm focus:outline-none`}
            >
              <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </button>
          </li>
          {pageNumbers
            .slice(Math.max(currentPage - 5, 0), currentPage + 5)
            .map((pageNumber) => (
              <li key={pageNumber}>
                <button
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`${
                    pageNumber === currentPage
                      ? "bg-blue-500 text-white"
                      : "bg-white hover:bg-gray-50"
                  } px-3 py-1 border border-gray-300 font-medium text-sm focus:outline-none`}
                >
                  {pageNumber}
                </button>
              </li>
            ))}
          <li>
            <button
              onClick={() =>
                setCurrentPage(
                  currentPage === pageNumbers.length
                    ? pageNumbers.length
                    : currentPage + 1
                )
              }
              disabled={currentPage === pageNumbers.length}
              className={`${
                currentPage === pageNumbers.length
                  ? "bg-gray-200 text-gray-600"
                  : "bg-white hover:bg-gray-50"
              } px-3 py-1 border border-gray-300 rounded-r-md font-medium text-sm focus:outline-none`}
            >
              <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default MyPost;
