import {Router} from "express";
import authRouter from "./auth.routes.js";


const router = Router();
const BASE_API = "/api";

router.get("/", (req, res) => {
    res.json({msg: "connected to the API !"});
});

router.use(`${BASE_API}/auth`, authRouter);

export default router;