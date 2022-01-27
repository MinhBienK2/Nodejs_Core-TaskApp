const express = require('express')
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');

const userRouter = require('../src/routers/user.js')
const taskRouter = require('../src/routers/task.js')
const port = process.env.PORT

require('./db/mongoose.js')

var app = express()

// Chặn lại các đường dẫn để bảo trì
// app.use((req, res, next) => {
//     res.send("Dang bao chi nhe !")
// })
// app.use((req, res, next) => {
//     if(req.method === "POST"){
//         res.send("dang cap nhap nhe cu !")
//     }else {
//         next()
//     }
// })

//use router 
app.use(userRouter)
app.use(taskRouter)


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// app.use(express.json())


app.listen(port,() => {
    console.log('cong : ------------------',port)
})



async function testBcrypt(){
    try{
        const isTest =await bcrypt.hash('bien12344',8)
        const isTest1 =await bcrypt.hash('bien12344',8)

        console.log(isTest)
        console.log(isTest1)
        const isCheck =await bcrypt.compare(isTest,isTest1)
        console.log(isCheck)
    }catch(e){
        console.log(e)
    }
}

async function testJsonWebToken(){
    const token =await jwt.sign({_id : 'abc123'},'thisismynewcourse',{expiresIn:'7 days'})
    console.log(token)
    const data = jwt.verify(token,'thisismynewcourse')
    console.log(data)
}

// testBcrypt()
// testJsonWebToken()


const Task = require('./model/task')
const User = require('./model/user')

const main = async ()=> {
    // const task = await Task.findById('61ee87974933f168516d96cf')
    // .populate('owner')
    // console.log(task.owner)
    const user = await User.findById('61ee87874933f168516d96c4')
    .populate('tasks')
    console.log(user.tasks)
}
// main()