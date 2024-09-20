import express from 'express';
import { getAllRecipes , getRecipeById , addRecipe , updateRecipe , deleteRecipe } from '../controller/recipes.js';

const router = express.Router();

router.get('/', getAllRecipes);
router.get('/:id', getRecipeById);
router.post('/', addRecipe);
router.put('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);

export default router;