import Recipe from '../models/Recipe.js';

class Recipe {
    // Récupérer toutes les recettes
    static async getAllRecipes(req, res) {
        try {
            const recipes = await Recipe.getAll();
            res.status(200).json(recipes);
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la récupération des recettes.' });
        }
    }

    // Récupérer une recette par ID
    static async getRecipeById(req, res) {
        try {
            const recipe = await Recipe.getOneById(req.params.id);
            if (recipe.length) {
                res.status(200).json(recipe[0]);
            } else {
                res.status(404).json({ error: 'Recette non trouvée.' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la récupération de la recette.' });
        }
    }

    // Ajouter une nouvelle recette
    static async addRecipe(req, res) {
        try {
            const newRecipe = await Recipe.add(req.body);
            res.status(201).json({ message: 'Recette ajoutée avec succès.', id: newRecipe.insertId });
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de l\'ajout de la recette.' });
        }
    }

    // Mettre à jour une recette existante
    static async updateRecipe(req, res) {
        try {
            const updatedRecipe = await Recipe.update({ id: req.params.id, ...req.body });
            if (updatedRecipe.affectedRows) {
                res.status(200).json({ message: 'Recette mise à jour avec succès.' });
            } else {
                res.status(404).json({ error: 'Recette non trouvée.' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la mise à jour de la recette.' });
        }
    }

    // Supprimer une recette
    static async deleteRecipe(req, res) {
        try {
            const deletedRecipe = await Recipe.remove(req.params.id);
            if (deletedRecipe.affectedRows) {
                res.status(200).json({ message: 'Recette supprimée avec succès.' });
            } else {
                res.status(404).json({ error: 'Recette non trouvée.' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la suppression de la recette.' });
        }
    }
}

export default Recipe;