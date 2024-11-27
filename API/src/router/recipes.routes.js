import { Router } from "express";
import adminRequired from "../middleware/adminRequired.js";
import { addRecipe, deleteRecipe, getAllRecipes, getRecipeById, updateRecipe } from "../controller/recipes.js";


const router = Router();

router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);
router.post("/", adminRequired, addRecipe);
router.patch("/:id", adminRequired, updateRecipe);
router.delete("/:id", adminRequired, deleteRecipe);

export default router;