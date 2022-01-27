const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')   // dùng với body
const multer = require('multer')    // dùng với file
const sharp = require('sharp')      // cấu hình lại ảnh
const nodemailer = require("nodemailer");   // send mail


const User = require('../model/user.js')
const auth = require('../middlewares/auth')
const {sendWelcomeMessage, sendCancelationEmail} = require('../emails/account')
const { update } = require('../model/user.js')

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
router.use(bodyParser.json())

const upload = multer({ 
    // dest : 'avatars/',
    limits : {
        fileSize : 5000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/i)){
            return cb(new Error('please update a image'))
        }
        cb(undefined,true)
    }
})

router.post('/user/me/avatar',auth,upload.single('avatar'),async (req,res)=> {
    const buffer = await sharp(req.file.buffer).resize({width: 250 , height: 250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send(req.user)
},(error,req,res,next)=> {
    res.status(400).send({error : error.message})
})

router.get('/user/:id/avatar',async (req,res)=> {
    try{
        const user = await User.findById(req.params.id);
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type', 'image/jpg')
        res.send(user.avatar)
    }catch(err){
        res.status(400).send(err)
    }
})

router.get('/user/me',auth,async (req,res) => {
    res.send(req.user)
})

router.post('/user/logout',auth, async (req,res) => {
    try{
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }catch(err){
        res.status(500).send(err)
    }
})

router.post('/user/logout/all',auth, async (req,res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch(err){
        res.status(400).send(err)
    }
    
})

router.post('/user',async (req,res) => {
    try{
        const user = new User(req.body)
        const token = await user.generateAuthToken()
        sendWelcomeMessage(user.email,user.name)
        res.status(201).send({user,token})
    }catch(err){
        res.status(500).send(err)
    }
})

router.post('/user/login', async (req,res) => {
    try{
        // xác thực với email và password
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken();
        res.status(200).send({user,token})
    }catch(e) {
        console.log(e)
        res.status(400).send(e)
    }
})


router.patch('/users/me',auth, async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password']
    const isValidator = updates.every(update => {
        return allowedUpdates.includes(update)
    })
    if(!isValidator){
        return res.status(400).send({error : 'invalid updates'})
    }
    try{
        updates.forEach(update => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch(err){
        res.status(400).send(err)
    }
})

router.delete('/users/me',auth, async (req,res) => {
    try{
        await req.user.remove()
        sendCancelationEmail(req.user.email,req.user.name)
        res.send(req.user)
    }catch(err) {
        res.status(400).send(err)
    }
})

router.delete('/user/me/avatar',auth, async (req,res) =>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})
module.exports = router