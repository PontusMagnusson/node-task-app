const express = require('express')
const Task = require('../models/task')

const router = new express.Router()

router.get('/tasks', async (req, res) => {
    
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)

        if (!task) {
            return res.status(404).send()
        }
    
        res.send(task)
    } catch (error) {
        return res.status(500).send()
    }
})

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update' })
    }

    try {
        const task = await Task.findById(req.params.id)
        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])

        task.save()
        res.send(task)
    } catch (error) {
        res.status(400).send(error) // Assume error is client side for now
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router