import {Router} from "express";
import authRouter from "./auth.routes.js";
import recipesRouter from "./recipes.routes.js"; 
import commentsRouter from "./comment.routes.js"; 
import adminRouter from "./admin.routes.js";

const router = Router();
const BASE_API = "/api/v1";

router.get("/", (req, res) => {
    res.json({msg: "connected to the API !"});
});

router.use(`${BASE_API}/auth`, authRouter);
router.use(`${BASE_API}/recipes`, recipesRouter);
router.use(`${BASE_API}/comments`, commentsRouter);
router.use(`${BASE_API}/admin`, adminRouter);

export default router;