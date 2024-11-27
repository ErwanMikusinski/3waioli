import Comments from "../model/Comments.js";

const addComment = async (req, res) => {
    const { comment } = req.body;
    const { id } = req.params;

    try {
        const response = await Comments.addComment([
            comment,
            req.session.user.id, 
            id,
        ]);
        res.json({ msg: `Commentaire bien ajouté`, insertId: response.insertId }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
};

const getCommentById = async (req, res) => {
    const { idRecipes } = req.params;

    try {
        const response = await Comments.getCommentById(idRecipes);

        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  const userId = req.session.user.id;

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
