// Base api/auth 

import { logout } from "../controller/auth_controller.js";
import { login } from "../controller/auth_controller.js"
import { register } from "../controller/auth_controller.js"
import {Router} from "express";


const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

export default router;