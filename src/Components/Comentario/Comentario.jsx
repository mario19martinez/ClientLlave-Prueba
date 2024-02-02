import { useState } from "react";

function Comentario() {
  // Estado local para almacenar los comentarios
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Funcion para manejar el envio de un nuevo comentario
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") {
      return;
    }
    // Agregar el nuevo comentario a la lista de comentarios
    setComments([...comments, newComment]);
    // Limpiar el campo de entrada
    setNewComment("");
  };

  return (
    <div>
      <h2>Comentarios</h2>
      <ul>
        {comments.map((comment, index) => {
          <li key={index}>{comment}</li>;
        })}
      </ul>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          placeholder="Escribe un comentario..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Agregar Comentario</button>
      </form>
    </div>
  );
}

export default Comentario;
