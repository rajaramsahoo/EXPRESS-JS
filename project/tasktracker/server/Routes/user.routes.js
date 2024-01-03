import  express  from "express"; 
import { signup,login } from "../controllers/user.controllers.js";
import { loginValidation,loginValidationError } from "../middleWares/validation.index.js";
const router = express.Router() 


router.post("/signup" ,signup)

router.post("/login",loginValidation(),loginValidationError,login)

export default router;
