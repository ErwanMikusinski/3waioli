import { checkAuth } from '../controller/auth_controller.js';

import { logout } from "../controller/auth_controller.js";
import { login } from "../controller/auth_controller.js"
import { register } from "../controller/auth_controller.js"
import {Router} from "express";


const router = Router();

router.get("/", checkAuth)
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

export default router;