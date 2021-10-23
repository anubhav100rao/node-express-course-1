const Task = require('../models/task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../middleware/custom-error')

const getAllTasks = asyncWrapper(async(req, res, next) => {
    const tasks = await Task.find({})
    res.status(200).json({tasks})
})

const createTask = asyncWrapper(async(req, res) => {    
    const task = await Task.create(req.body)
    res.status(201).json({task})
})


const getTask = asyncWrapper(async(req, res, next) => {
    const {id: taskId} = req.params
    // const taskId = req.params.id
    const task = await Task.findOne({_id: taskId});
    console.log(taskId)
    if(!task) {
        return next(createCustomError(`no task with taksId : ${taskId}`, 404))
        // return res.status(404).json({msg: `no task with taksId : ${taskId}`})
    }
    res.status(200).json({task})
})

const deleteTask = asyncWrapper(async(req, res) => {
    const {id: taskId} = req.params
    const task = await Task.findOneAndDelete({_id: taskId})
    if(!task) {
        return next(createCustomError(`no task with taksId : ${taskId}`, 404))
        // return res.status(404).json({msg: `no task with taksId : ${taskId}`})
    }
    res.status(200).json({task})
})

const updateTask = asyncWrapper(async(req, res) => {
    const {id: taskId} = req.params
    const task = await Task.findOneAndUpdate({_id:taskId},req.body, {
        new: true,
        runValidators: true
    })
    if(!task) {
        return next(createCustomError(`no task with taksId : ${taskId}`, 404))
        // return res.status(404).json({msg: `no task with taskId: ${taskId}`})
    }
    res.status(200).json({id: taskId, data: req.body})  
})

// const getAllTasks = async(req, res) => {
//     try {
//         const tasks = await Task.find({})
//         res.status(200).json({tasks})
//     } catch(err) {
//         res.status(500).json({msg: err})
//     }
// }



// const createTask = async(req, res) => {
//     try {
//         const task = await Task.create(req.body)
//         res.status(201).json({task})
//     } catch(err) {
//         res.status(500).json({msg: err})
//     }
// }

// const getTask = async(req, res) => {
//     try {
//         const {id: taskId} = req.params
//         // const taskId = req.params.id
//         const task = await Task.findOne({_id: taskId});
//         console.log(taskId)
//         if(!task) {
//             return res.status(404).json({msg: `no task with taksId : ${taskId}`})
//         }
//         res.status(200).json({task})
//     } catch(err) {
//         res.status(500).json({msg: err})
//     }
// }


// const deleteTask = async(req, res) => {
//     try {
//         const {id: taskId} = req.params
//         const task = await Task.findOneAndDelete({_id: taskId})
//         if(!task) {
//             return res.status(404).json({msg: `no task with taksId : ${taskId}`})
//         }
//         res.status(200).json({task})
//     } catch(err) {
//         res.status(500).json({msg: err})
//     }
    
// }

// const updateTask = async(req, res) => {
//     try {
//         const {id: taskId} = req.params
//         const task = await Task.findOneAndUpdate({_id:taskId},req.body, {
//             new: true,
//             runValidators: true
//         })
//         if(!task) {
//             return res.status(404).json({msg: `no task with taskId: ${taskId}`})
//         }
//         res.status(200).json({id: taskId, data: req.body})
//     } catch(err) {
//         res.status(500).json({msg: err})
//     }
// }
module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}