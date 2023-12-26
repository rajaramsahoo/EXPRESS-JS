const express = require('express')
const app = express();
const port = 3000;

function middleWare1(req, res, next){
        console.log("I am first middle ware")
        next();
}

function middleWare2(req, res, next){
    console.log("I am second middle ware")
    next();
}



app.get("/", middleWare1,middleWare2,(req, res)=>{
    console.log("This is root route")
    res.status(200).send("This is root route")
})

function admin(req, res, next){
    console.log("admin")
    if(req.query.user == "raja"){
        next();
    }
    return res.status(401).send("you are not authorised")
}


app.get("/admin" ,admin, (req, res)=>{
    console.log("Now u can be manupulate the data")
    res.status(200).send("Now u can be manupulate the data")
})

app.listen(port, ()=>{
    console.log(`listen at port ${port}`)
})