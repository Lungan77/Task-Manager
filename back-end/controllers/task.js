import Task from '../models/taskModel.js';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

 export const getTasks = asyncHandler(async(req, res) => {

    const tasks = await Task.find({user: req.user.id});
    res.status(200).json(tasks);

})

export const postTasks = asyncHandler(async(req, res) => {

    if (!req.body.task){
        res.status(400)
        throw new Error('Please enter a task')
    };

    const task = await Task.create({
        user : req.user.id,
        task : req.body.task
    });

    res.status(200).json(task);
})

export const putTasks = asyncHandler(async(req, res) => {

    const task = await Task.findById(req.params.id);

    if (!task){
        res.status(400)
        throw new Error('no task')
    }

    if (!req.user){
        res.status(401)
        throw new Error('User no found')
    }

    if (task.user.toString() !== req.user.id ){
        res.status(401)
        throw new Error('Not authorized')
    }

    const update = await Task.findByIdAndUpdate(req.params.id, req.body,{
        new: true
    })

    res.status(200).json(update)
})

export const deleteTasks = asyncHandler(async(req, res) => {

    const task = await Task.findById(req.params.id);

    if (!task){
        res.status(400)
        throw new Error('no task')
    }

    if (!req.user){
        res.status(401)
        throw new Error('User no found')
    }

    if (task.user.toString() !== req.user.id ){
        res.status(401)
        throw new Error('Not authorized')
    }

    await task.remove();
    res.status(200).json('Task deleted')

})