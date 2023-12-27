import  express  from "express"; 
import { creatTask } from "../controllers/task.controllers.js";
import middleWare from "../middleWares/auth.verifyMiddleWare.js";

const router = express.Router() 

router.post("/",middleWare ,creatTask);


export default router;
