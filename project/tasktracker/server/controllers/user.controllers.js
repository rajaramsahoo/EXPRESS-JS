import { v4 as uuidv4 } from 'uuid';
import fs from "node:fs/promises"
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken.js'


export const signup = async (req, res) => {

    try {
        let password = await bcrypt.hash(req.body.password, 12)

        // console.log("rew.body>>",req.body);
        let userData = {
            id: uuidv4(),
            ...req.body,
            password,
            tasks: []
        }

        //read the data.json
        let filterData = await fs.readFile("./Database/data.json")
        filterData = JSON.parse(filterData)
        // console.log(filterData)

        let emailFound = filterData.find((user) => {
            return user.Email == req.body.Email
        })

        //  console.log(emailFound)
        if (emailFound) {
            return res.status(409).send("User Email already register")
        }

        let phoneFound = filterData.find((user) => {
            return user.Phone == req.body.Phone
        })
        if (phoneFound) {
            return res.status(409).send("User phone number already register")
        }



        filterData.push(userData)
        await fs.writeFile("./Database/data.json", JSON.stringify(filterData))
        // console.log(userData)
        return res.status(200).send("user sign up")
    }
    catch (err) {
        console.log(err);
        res.status(404).send("something went wrong")
    }


}

export const login = async (req, res) => {

    try {
        const { Email, password } = req.body;
        let filterData = await fs.readFile("./Database/data.json")
        filterData = JSON.parse(filterData)


        let emailFound = filterData.find((user) => {
            return user.Email == req.body.Email
        })
        //  console.log(emailFound)
        if (!emailFound) {
            return res.status(409).send("User Email not found")
        }

        let matchPossword = await bcrypt.compare(password, emailFound.password);
        if(!matchPossword){
            return res.status(401).json({err:"user password was wrong"})
        }

        let playload = {
            Email : emailFound.Email
        }
      let token =  generateToken(playload)
      console.log(token)
        res.status(200).json({msg:"user login successfully",token})
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "something went wrong in LOGIN" })
    }
}