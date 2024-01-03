//link==mongodb+srv://rajaramsahoo:avQmpRpZB6HUmkgz@rajadb.znifruv.mongodb.net/

import mongoose from "mongoose";


async function dbConnect() {
    try {
        await mongoose.connect('mongodb+srv://rajaramsahoo:avQmpRpZB6HUmkgz@rajadb.znifruv.mongodb.net/OLX');
        console.log("DB CONNECTED SUCESSFULLY")
    }
    catch (err) {
        console.log(err)
    }
}
dbConnect()