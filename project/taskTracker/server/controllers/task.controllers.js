import { v4 as uuidv4 } from 'uuid';
import fs from "node:fs/promises"
import creatRemiders from "../utils/remiders.js"
import schedule from 'node-schedule';


export async function creatTask(req, res) {
    try {
        // console.log("DECODE ::::", req.payload)
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
        let calculateRemiders = creatRemiders(start_date, ens_date);
        taskObj.reminders = [...calculateRemiders, ens_date]

        userFound.tasks.push(taskObj);
        // console.log("after", filterData);
        await fs.writeFile("./Database/data.json", JSON.stringify(filterData))
        // console.log(userData)
        // //  return res.status(200).send("user sign up")
        // console.log(userFound.tasks)


        res.status(200).json({ msg: "created a task sucessfully" })

        taskObj.reminders.forEach((element, idex) => {
            schedule.scheduleJob(`${taskObj.taskId}_${idex + 1}`, element, function () {
                console.log("Email send for remider")
            })

        });
        console.log("=====>", schedule.scheduledJobs)


    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err: "something went wrong in task" })
    }
}

export async function allTasks(req, res) {
    try {
        // console.log("DECODE ::::", req.payload)
        let filterData = await fs.readFile("./Database/data.json")
        filterData = JSON.parse(filterData);
        // console.log(filterData);
        let userFound = filterData.find((user) => {
            return user.Email == req.payload.Email
        })

        if (!userFound) {
            return res.status(401).send("User not found")
        }
        // console.log(userFound.tasks)
        res.status(200).send(`${req.payload.Email} tasks found sucessfully`)

    }
    catch (err) {
        console.log(err);
        res.status(404).send(`${req.payload.Email} tasks not found sucessfully`)

    }
}

export async function singleTasks(req, res) {
    try {
        const { taskId } = req.params
        // console.log(req.params)
        let filterData = await fs.readFile("./Database/data.json")
        filterData = JSON.parse(filterData)
        // console.log(filterData)
        let userFound = filterData.find((user) => {
            return user.Email == req.payload.Email
        })
        // console.log(req.payload)
        if (!userFound) {
            return res.status(404).send("User not found")
        }
        // console.log(userFound);
        let taskIndex = userFound.tasks.findIndex((ele) => {
            return ele.taskId == taskId
        })
        console.log(taskIndex)
        if (taskIndex == -1) {
            return res.status(500).send("taskIndex not found")
        }

        let singleTask = userFound.tasks[taskIndex];
        console.log(singleTask)


        res.status(200).json({ msg: `${taskId} task found` })
    }
    catch (err) {
        console.log(err)
        res.status(500).send("taskId not found")
    }
}

export async function deleteTask(req, res) {
    try {
        const { taskId } = req.params
        // console.log(req.params);
        let filterData = await fs.readFile("./Database/data.json")
        filterData = JSON.parse(filterData)
        // console.log(filterData)
        let userFound = filterData.find((user) => {
            return user.Email == req.payload.Email
        })
        // console.log(req.payload)
        if (!userFound) {
            return res.status(404).send("User not found")
        }
        // console.log(userFound);
        let taskIndex = userFound.tasks.findIndex((ele) => {
            return ele.taskId == taskId
        })
        console.log(taskIndex)
        if (taskIndex == -1) {
            return res.status(500).send("taskIndex not found")
        }
        //remove the schedule jobs
        userFound.tasks[taskIndex].reminders.forEach((ele, index) => {
            schedule.cancelJob(`${taskId}_${index + 1}`);
        })
        console.log(schedule.scheduledJobs)
        userFound.tasks.splice(taskIndex, 1);
        await fs.writeFile("./Database/data.json", JSON.stringify(filterData))


        res.status(200).json({ msg: `${taskId} task deleted ` })
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Task can`t be deleted")
    }
}

export async function updateTask(req, res) {
    try {
        const { taskId } = req.params;
        console.log(req.params);
        let filterData = await fs.readFile("./Database/data.json")
        filterData = JSON.parse(filterData)
        // console.log(filterData)
        let userFound = filterData.find((user) => {
            return user.Email == req.payload.Email
        })
        // console.log(req.payload)
        if (!userFound) {
            return res.status(404).send("User not found")
        }
        // console.log(userFound);
        let taskIndex = userFound.tasks.findIndex((ele) => {
            return ele.taskId == taskId
        })
        // console.log(taskIndex)
        if (taskIndex == -1) {
            return res.status(500).send("taskIndex not found")
        }
        // console.log(userFound.tasks[taskIndex])
        // console.log(req.body)
        userFound.tasks[taskIndex].taskName = req.body.taskName
        userFound.tasks[taskIndex].taskDeadlineDate = req.body.deadLine
        let cur_date = userFound.tasks[taskIndex].taskcreatedDate
        let create_date = new Date(cur_date)
        let deadline_date = new Date(req.body.deadLine)
        let updateReminders = creatRemiders(create_date, deadline_date);
        userFound.tasks[taskIndex].reminders = updateReminders 
        await fs.writeFile("./Database/data.json", JSON.stringify(filterData))
        res.status(200).json({ msg: `${taskId} is updated sucessfully` })
    }
    catch (err) {
        console.log(err);
        res.status(500).send("task can't be update")
    }
}