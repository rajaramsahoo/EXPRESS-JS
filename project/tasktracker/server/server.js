const express = require ("express")
const app = express();
const PORT = 3000;
 
app.get("/", (req, res)=>{
    res.status(200).send('server is live')
})

app.listen(PORT , ()=>{
    console.log(`server listening on port ${PORT}`)
})
