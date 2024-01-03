import express from "express";
import mongoose from "mongoose";
import './dbConnect.js'

const app = express()
const PORT = 3000;

const kittySchema = new mongoose.Schema({
    name: String
});

const Kitten = mongoose.model('Kitten', kittySchema);



app.get('/olx', async (req, res) => {

    try {
        // const fluffy = new Kitten({ name: 'fluffy' });
        // await fluffy.save();
//=====
 const tommy = await Kitten.create({name:"tommy"})

        res.status(200).json({ msg: "server is live on port" })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "something went wrong" })

    }

})

app.listen(PORT, () => {
    console.log(`server live on port${PORT}`)
})
