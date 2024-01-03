import { v4 as uuidv4 } from 'uuid';
import fs from "node:fs/promises"
import creatRemiders from "../utils/remiders.js"

export async function creatTask(req, res) {
    try {
        // console.log("DECODE ::::",req.payload)
        const { taskName, deadLine } = req.body;
        // console.log(req.body)
        let filterData = await fs.readFile("./Database/data.json")
        filterData = JSON.parse(filterData)
        // console.log(filterData)

        let userFound = filterData.find((user) => {
            return user.Email == req.payload.Email
        })

        if (!userFound) {
            return res.status(404).send("User not found")
        }
        // console.log(userFound);
       


        let taskObj = {
            taskName,
            taskId: uuidv4(),
            taskcreatedDate: new Date(),
            taskDeadlineDate: new Date(deadLine),
            isCompleted: false,
            reminders: []
        }
        let taskNameFound = userFound.tasks.find((user) => {
            return user.taskName == taskName
        })
        if (taskNameFound) {
            return res.status(409).send("User taskname already in json")
        }

        let start_date = new Date();
        let ens_date = new Date(deadLine);
        let calculateRemiders = creatRemiders(start_date,ens_date );
        taskObj.reminders = [...calculateRemiders,ens_date]
       
        userFound.tasks.push(taskObj);
        // console.log("after", filterData);
        await fs.writeFile("./Database/data.json", JSON.stringify(filterData))
        // console.log(userData)
        // //  return res.status(200).send("user sign up")
        console.log(userFound.tasks)


        res.status(200).json({ msg: "created a task sucessfully" })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err: "something went wrong in task" })
    }
}

export async function allTasks(req,res){
    try{
        const {Email} = req.body
        let filterData = await fs.readFile("./Database/data.json")
        filterData = JSON.parse(filterData);
        // console.log(filterData);
        let userFound = filterData.find((user) => {
            return user.Email == req.body.Email
        })

        if (!userFound) {
            return res.status(404).send("User not found")
        }
        console.log(userFound.tasks)
        res.status(200).send(`${req.body.Email} tasks found sucessfully`)

    }
    catch(err){
        console.log(err);
        res.status(404).send(`${req.body.Email} tasks not found sucessfully`)

    }
}

