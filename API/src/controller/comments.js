import Comments from "../model/Comments.js";

// Ajouter un commentaire
const addComment = async (req, res) => {
    const { comment } = req.body;
    const { id } = req.params;  // ID de la recette (ou d'un autre élément)

    try {
        // Appel à la méthode du modèle pour ajouter un commentaire
        const response = await Comments.addComment([
            comment,
            req.session.user.id, // ID de l'utilisateur depuis la session
            id, // ID de la recette passée dans l'URL
        ]);
        res.json({ msg: `Commentaire bien ajouté`, insertId: response.insertId }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
};

// Récupérer les commentaires d'une recette
const getCommentById = async (req, res) => {
    const { idRecipes } = req.params;  // On suppose ici que "id" est l'ID de la recette

    try {
        // Appel à la méthode du modèle pour récupérer les commentaires d'une recette
        const response = await Comments.getCommentById(idRecipes);

        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
};

// Supprimer un commentaire
const deleteComment = async (req, res) => {
  const { id } = req.params;
  const userId = req.session.user.id; // ID de l'utilisateur connecté depuis la session

  try {

    const response = await Comments.deleteComment(id, userId);

    if (response.affectedRows > 0) {
      res.json({ msg: `Commentaire bien supprimé` });
    } else {
      res.status(404).json({ msg: "Commentaire non trouvé" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Erreur de serveur", error: error.message });
  }
};

export { addComment, getCommentById, deleteComment };
