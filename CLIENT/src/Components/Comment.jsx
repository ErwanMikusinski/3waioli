import { useState, useEffect, useContext } from "react";
import { UserContext } from "../hooks/UserContextProvider";
import toast from "react-hot-toast";
import '../assets/style/comment.scss'; // Importez votre fichier CSS ou SCSS ici

function Comment({ recipeId }) {
  const user = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL_BACKEND}/api/v1/comments/${recipeId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok)
          throw new Error("Erreur de récupération des commentaires");
        return response.json();
      })
      .then((data) => setComments(data))
      .catch((err) => console.log(err));
  }, [recipeId]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    fetch(
      `${import.meta.env.VITE_URL_BACKEND}/api/v1/comments/addComment/${recipeId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          comment: commentText,
        }),
      }
    )
      .then((response) => {
        if (!response.ok)
          throw new Error("Erreur lors de l'ajout du commentaire");
        return response.json();
      })
      .then((data) => {
        setComments([
          ...comments,
          {
            comment: commentText,
            id: data.insertId,
            username: user.username,
            statut: 1,
          },
        ]);
        setCommentText("");
        toast.success("Votre commentaire a bien été ajouté");
      })
      .catch(() => toast.error("Erreur lors de l'ajout du commentaire"));
  };

  const handleDeleteComment = (commentId) => {
    fetch(`${import.meta.env.VITE_URL_BACKEND}/api/v1/comments/${commentId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erreur lors de la suppression");
        setComments(comments.filter((comment) => comment.id !== commentId));
        toast.success("Commentaire supprimé avec succès");
      })
      .catch(() => toast.error("Erreur lors de la suppression du commentaire"));
  };

  return (
    <div className="comments">
      <h3>Commentaires</h3>

      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Ajouter un commentaire"
          required
        />

        {user?.email ? (
          <button type="submit">Envoyer</button>
        ) : (
          <p>Vous devez être connecté(e) pour poster un commentaire.</p>
        )}
      </form>

      <ul>
        {comments?.map((comment) => (
          <li key={comment.id}>
            <p>Posté par : {comment.username}</p>
            <p>{comment.comment}</p>
            {user?.username === comment.username && (
              <button onClick={() => handleDeleteComment(comment.id)}>
                Supprimer
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comment;
