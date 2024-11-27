import {Router} from "express";
import { addComment, getCommentById, deleteComment } from '../controller/comments.js';
import userRequired from "../middleware/userRequired.js";

const router = Router();

router.post("/addComment/:id", userRequired, addComment);
router.get("/:idRecipes", getCommentById);
router.delete("/:id", deleteComment);


export default router;