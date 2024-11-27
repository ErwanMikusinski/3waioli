import { Router } from "express"; 
import adminRequired from "../middleware/adminRequired.js"; 
import { commentDelete, getAllReport, userBan } from "../controller/admin.js";


const router = Router();

router.patch('/user/ban/:id', adminRequired, userBan);
router.delete('/comment/delete/:id', adminRequired, commentDelete);
router.get('/reported', adminRequired, getAllReport);


export default router;