import { useState, useEffect } from "react";
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

        console.log(response.data); // Agrega esto para verificar la estructura de los datos

        setUserPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener las publicaciones:", error.message);
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, []); // Solo se ejecuta al montar el componente

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 -translate-y-80">
      <h2 className="text-3xl font-bold mb-4">Mis Publicaciones</h2>
      {userPosts.length === 0 ? (
        <p className="text-gray-600">Todavia no tienes publicaciones hechas.</p>
      ) : (
        <ul>
          {userPosts.map((post) => (
            <li key={post.id}
            className="bg-white shadow-md mb-4 p-6 rounded-md"
            >
              {post.content && <p className="text-xl font-semibold mb-2">{post.content}</p>}
              {post.image && <img src={post.image} alt="Publicacion" className="mb-2 rounded-md" />}
              <div>
                <p className="text-gray-600 mb-2">Comentarios: </p>
                {post.Comments && post.Comments.length > 0 && (
                  <ul>
                    {post.Comments.map((comment) => (
                      <li key={comment.id} className="text-sm">
                        {comment.content} - {comment.User.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <p className="text-gray">Like: </p>
                {post.Likes && post.Likes.length > 0 && (
                  <ul>
                    {post.Likes.map((like) => (
                      <li key={like.id} className="text-sm">
                        {like.User.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyPost;
