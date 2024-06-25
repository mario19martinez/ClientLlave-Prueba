import { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";

function MyPost() {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        <p className="ml-4 text-blue-700 text-lg">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-10 md:px-20 lg:px-40 bg-gray-200">
      <div className="mb-8 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800">Mis Publicaciones</h2>
      </div>
      <ul className="flex flex-col items-center justify-center">
        {userPosts.map((post) => (
          <li key={post.id} className="bg-white shadow-md mb-8 p-6 rounded-md md:w-1/2 md:h-auto">
            <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
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
            {post.showComments && post.comments && post.comments.length > 0 && (
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
                      {/* <p className="text-base font-hammersmithOne">{comment.user.name} {comment.user.last_name}</p> */}
                      <p className="text-base">{comment.content}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyPost;
