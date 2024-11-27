import Recipe from '../model/Recipe.js';


    async function getAllRecipes(req, res) {
        try {
            const recipes = await Recipe.getAll();
            res.status(200).json(recipes);
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la récupération des recettes.' });
        }
    }

    async function getRecipeById(req, res) {
        try {
            const recipe = await Recipe.getOneById(req.params.id);
                res.status(200).json(recipe);
        } catch (error) {
            res.status(404).json({ error: 'Erreur lors de la récupération de la recette.' });
        }
    }

    async function addRecipe(req, res) {
        try {
            const newRecipe = await Recipe.addRecipe({...req.body, users_id : req.session.user.id});
            res.status(201).json({ message: 'Recette ajoutée avec succès.', id: newRecipe.insertId});
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de l\'ajout de la recette.' });
        }
    }

    async function updateRecipe(req, res) {
        try {
            const updatedRecipe = await Recipe.updateRecipe({ id: req.params.id, ...req.body, users_id : req.session.user.id });
            if (updatedRecipe.affectedRows) {
                res.status(200).json({ message: 'Recette mise à jour avec succès.' });
            } else {
                res.status(404).json({ error: 'Recette non trouvée.' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la mise à jour de la recette.' });
        }
    }

    async function deleteRecipe(req, res) {
        try {
            const deletedRecipe = await Recipe.deleteRecipe(req.params.id);
            if (deletedRecipe.affectedRows) {
                res.status(200).json({ message: 'Recette supprimée avec succès.' });
            } else {
                res.status(404).json({ error: 'Recette non trouvée.' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la suppression de la recette.' });
        }
    }

export { getAllRecipes , getRecipeById , addRecipe , updateRecipe , deleteRecipe }