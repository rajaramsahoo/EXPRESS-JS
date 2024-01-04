import  express from "express";
import userRoutes   from "./Routes/user.routes.js"
import taskRoutes  from "./Routes/task.routes.js"

const app = express();
const PORT = 3000;

app.use(express.json());
//
 
app.get("/", (req, res)=>{
    res.status(200).send('server is live on port')
})

app.use("/api/user", userRoutes)
app.use("/api/task", taskRoutes)


app.listen(PORT , ()=>{
    console.log(`server listening on port ${PORT}`)
})
