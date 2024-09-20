import Recipe from '../model/Recipe.js';

export const getRecipeDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.getOneById(id);

        if (!recipe) {
            return res.status(404).json({ message: 'Recette non trouvée' });
        }

        return res.json(recipe);
    } catch (error) {
        return res.status(500).json({ message: 'Erreur serveur', error });
    }
};