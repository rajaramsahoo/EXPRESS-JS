const express = require('express');
const app = express();
const port = 3000

function globalmiddleWare(req, res, next){
    console.log("i am global middle ware first")
    next()
}

function globalmiddleWare1(req, res, next){
    console.log("i am global middle ware list")
    next()
}


app.use(globalmiddleWare)
//The routes excuted that under the app.use(globalmiddleWare)
//when use /second we get globalmiddleware and second route
//when use /first u get globalmiddleware and first route

// app.use(globalmiddleWare1)


app.get("/first", (req,res,next)=>{
    console.log("First routes")
    res.status(200).send("First routes ")
    next()
})

// app.use(globalmiddleWare)
//when use /second we get globalmiddleware and second route
//when use /first u get only first route

app.get("/second", (req,res)=>{
    console.log("second routes")
    res.status(200).send("second routes ")
})

app.use(globalmiddleWare1)



app.listen(port,()=>{
    console.log("the server listening  on port")
})