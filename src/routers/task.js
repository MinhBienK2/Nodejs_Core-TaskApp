const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const Task = require('../model/task.js')
const auth = require('../middlewares/auth')

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
router.use(bodyParser.json())

// GET / tasks?completed=true
// GET / tasks?limit=10&skip=20
// GET / tasks?sortBy = createdAt:desc
router.get('/tasks',auth,async (req,res) => {
    try{
        const match = {}
        const sort = {}

        if(req.query.completed){
            match.completed = req.query.completed ==='true'
        }

        if(req.query.sortBy){
            const parts = req.query.sortBy.split(':')
            sort[parts[0]] = parts[1] === 'DESC' ? -1 : 1
        }
        
        await req.user.populate({
            path: 'tasks',
            match,
            options : {
                limit : parseInt(req.query.limit),
                skip : parseInt(req.query.skip),
                sort
            }
        })
        res.send(req.user.tasks)
    }catch(err){
        res.status(500).send(err)
    }
})

router.get('/task/:id',auth,async (req,res) => {
    const _id = req.params.id
    try{
        // const readDateTaskById = await Task.findById(_id)
        const readDateTask = await Task.findOne({_id,owner : req.user._id})
        res.send(readDateTask)
    }catch(err){
        res.status(500).send(err)
    }
})

router.post('/tasks',auth,async (req,res) => {
    const task = new Task({
        ...req.body,
        owner : req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    }catch(err) {
        res.status(500).send(err)
    }
})

router.patch('/tasks/:id',auth, async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isValidator = updates.every(update => {
        return allowedUpdates.includes(update)
    })
    if(!isValidator){
        return res.status(400).send({error : 'invalid updates'})
    }
    try{
        const task = await Task.findOne({_id : req.params.id,owner : req.user._id})
        if(!task){
            return res.status(404).send()
        }
        console.log(task.update)
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    }catch(err){
        res.status(400).send(err)
    }
})


router.delete('/tasks/:id',auth, async (req,res) => {
    try {
        const deleteTasks = await Task.findOneAndDelete({_id : req.params.id,owner : req.user._id})
        if(!deleteTasks){
            return res.status(404).send()
        }
        res.send(deleteTasks)
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router