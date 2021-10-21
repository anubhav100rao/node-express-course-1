const Task = require('../models/task')

const getAllTasks = async(req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json({tasks})
    } catch(err) {
        res.status(500).json({msg: err})
    }
}

const createTask = async(req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({task})
    } catch(err) {
        res.status(500).json({msg: err})
    }
}

const getTask = async(req, res) => {
    try {
        const {id: taskId} = req.params
        // const taskId = req.params.id
        const task = await Task.findOne({_id: taskId});
        console.log(taskId)
        if(!task) {
            return res.status(404).json({msg: `no task with taksId : ${taskId}`})
        }
        res.status(200).json({task})
    } catch(err) {
        res.status(500).json({msg: err})
    }
}

const updateTask = (req, res) => {
    res.send('update task')
}

const deleteTask = async(req, res) => {
    try {
        const {id: taskId} = req.params
        const task = await Task.findOneAndDelete({_id: taskId})
        if(!task) {
            return res.status(404).json({msg: `no task with taksId : ${taskId}`})
        }
        res.status(200).json({task})
    } catch(err) {
        res.status(500).json({msg: err})
    }
    
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}