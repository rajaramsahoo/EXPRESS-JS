import  express  from "express"; 
import { creatTask } from "../controllers/task.controllers.js";
import middleWare from "../middleWares/auth.verifyMiddleWare.js";
import { allTasks } from "../controllers/task.controllers.js";

const router = express.Router() 

router.post("/",middleWare ,creatTask);
router.get('/alltasks',allTasks)


export default router;
