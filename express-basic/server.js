const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  console.log(req)
  res.send('Hello World! express')
})

//post ex :req.body
app.post('/comment', (req, res) => {
  console.log(req.body)
  res.send('comment add sucessfully')
})

//post ex: req.query
app.post('/commentquery', (req, res) => {
  console.log(req.query)
  res.send('commentquery add sucessfully')
})

//post ex: req.params
app.post('/commentparams/:id', (req, res) => {
  console.log(req.params)
  res.send('commentquery add sucessfully')
})

//https://api.github.com/users/{user}
//localhost:3000/users/{user}
app.get("/users/:user" ,(req,res)=>{
  console.log(req.params)
  res.send(`u are curently viewing ${req.params.user} profile`)
})

//https://api.github.com/search/users?q={query}
app.get("/search/users",(req, res)=>{
  console.log(req.query)
  res.send(`u r searching for ${req.query.q}`)
})

//Adding
app.get('/add/:n1/:n2' ,(req ,res)=>{
  console.log(req.params)
  let sum = Number(req.params.n1)+Number(req.params.n2)
  console.log(sum)
  res.send(`The sum was ${sum}`)
})

//Adding usring status code 
app.get('/addition/:num1/:num2' ,(req ,res)=>{
  console.log(req.params)
  let sum = Number(req.params.num1)+Number(req.params.num2)
  console.log(sum)
  if(!sum) {
    return res.status(400).send("Enter the proper value of num1 & num2")
  }
  res.status(200).send(`The sum was ${sum}`);
})


//multiply
app.get('/multiply/:n1/:n2' ,(req ,res)=>{
  console.log(req.params)
  let multiply = Number(req.params.n1) * Number(req.params.n2)
  console.log(multiply)
  res.send(`The sum was ${multiply}`)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})