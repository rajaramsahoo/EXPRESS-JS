import  express  from "express"; 
import { creatTask } from "../controllers/task.controllers.js";
import middleWare from "../middleWares/auth.verifyMiddleWare.js";
import { allTasks } from "../controllers/task.controllers.js";
import { singleTasks } from "../controllers/task.controllers.js";
import { deleteTask } from "../controllers/task.controllers.js";
import { updateTask } from "../controllers/task.controllers.js";
const router = express.Router() 

router.post("/",middleWare ,creatTask);
router.get('/',middleWare,allTasks);
router.get('/:taskId',middleWare,singleTasks)
router.patch('/:taskId',middleWare,updateTask)
router.delete('/:taskId',middleWare,deleteTask)





export default router;
