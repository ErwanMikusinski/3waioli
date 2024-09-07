import express from 'express';
import Recipe from '../controllers/RecipeController.js';

const router = express.Router();

router.get('/recipes', Recipe.getAllRecipes);
router.get('/recipes/:id', Recipe.getRecipeById);
router.post('/recipes', Recipe.addRecipe);
router.put('/recipes/:id', Recipe.updateRecipe);
router.delete('/recipes/:id', Recipe.deleteRecipe);

export default router;