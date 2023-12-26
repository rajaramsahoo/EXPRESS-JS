const express = require('express')
const app = express()
const port = 3000;

// what is middlewear :--u are adding a funcationality before hitting the route

function globalMiddleWare(req, res, next){
    console.log("GlobalMiddle Wear : i am first")
    next();
}

app.use(globalMiddleWare)


app.get("/" ,(req, res)=>{
    console.log("hii middleware : /")
    res.status(200).send("Learn about middlewear")
})


 
app.get("/raja" ,(req, res)=>{
    console.log("Hello raja from :/raja")
    res.status(200).send("Hello Raja")
})


app.listen(port ,()=>{
    console.log(`listen at port ${port}`)
})