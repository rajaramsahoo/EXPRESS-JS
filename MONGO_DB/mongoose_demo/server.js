import express from "express";
import mongoose from "mongoose";
import './dbConnect.js'
import carModel from "./models/car.model.js";
import sellerModel from "./models/seller.model.js";


const app = express()
const PORT = 3000;

app.use(express.json())


app.post('/olx/car/:sellerId', async (req, res) => {

    try {

        const { sellerId } = req.params;

        //this was checking the sellerID was valid or not
        if (!mongoose.isValidObjectId(sellerId)) {
            return res.status(401).send("invalid seller id")

        }

        //checking for seller id is available or not in the data (if u delete that doc of gaving seller id in seller then this error was run)
        //looking for seller is exist or not
        const sellerFound = await sellerModel.findById(sellerId);
        if (!sellerFound) {
            return res.status(401).send("seller not found")
        }

        let carInfo = {

            ...req.body,
            sellerId,

        }
        // console.log(carInfo)


        await carModel.create(carInfo)

        res.status(200).json({ msg: `${req.body.name} car added to the seller id of ${sellerId}` })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "something went wrong" })

    }

})

app.post('/olx/seller', async (req, res) => {

    try {
        const { name, email, contact_no } = req.body;

        let sellerInfo = {
            ...req.body
        }

        await sellerModel.create(sellerInfo)

        res.status(200).json({ msg: `seller ${name} added to the data base` })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: `seller ${name} NOT added to the data base` })

    }

})


app.get('/olx/car/:carId', async (req, res) => {

    try {

        const { carId } = req.params;

        if (!mongoose.isValidObjectId(carId)) {
            return res.status(401).send("invalid carId id")
        }
        //.populate("take the field(here field was se;llerId") is used to get all the data of the field(field is ref to which)
        const carFound = await carModel.findById(carId).populate('sellerId');

        if (!carFound) {
            return res.status(401).send("carId not found")
        }

        res.status(200).json(carFound)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "something went wrong" })

    }

})



app.listen(PORT, () => {
    console.log(`server live on port${PORT} by mongodb demo`)
})
