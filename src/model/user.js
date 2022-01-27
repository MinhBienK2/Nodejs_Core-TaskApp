const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {Schema} = mongoose
const validator = require('validator')
const jwt = require('jsonwebtoken')
const Task = require('../model/task')

const userSchema = new Schema({
    name : {
        type :String,
        require : true,
        trim : true
    },
    email : {
       type : String,
       lowercase:true,
       trim : true ,        // loại bỏ khoảng trắng 2 đầu
       require : true,       // ràng buộc phải có
       unique:true,         // khoong cho trung lặp email
       validate(value) {        // check xem có phải email hay không
           if(!validator.isEmail(value))
                throw new Error('loi email')
       } 
    },
    password : {
        type : String,
        require : true ,
        minlength: 7,
        trim : true,
        validate(value) {
            if(value.toLowerCase().includes('password'))
                throw new Error('loi password')
        }
    },
    tokens : [{
        token : {
            type : String ,
            require : true
        }
    }],
    avatar : {
        type : Buffer
    }
},{
    timestamps : true
})

userSchema.virtual('tasks',{
    ref:'Task',
    localField : '_id',
    foreignField : 'owner'
})

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id : user._id.toString()},process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email,password) => {
    const user =await User.findOne({email})
    if(!user){
        throw new Error("unable to login ! ")
    }
    const isMatch =await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error("unable to login !")
    }
    return user
}

userSchema.pre('save',async function(next) {
    const user = this
    if(user.isModified('password'))
        user.password = await bcrypt.hash(user.password , 8)
    next()
})

userSchema.pre('remove',async function(next) {
    const user = this
    await Task.deleteMany({owner : user._id})
    next()
})

const User = mongoose.model('User',userSchema)
module.exports = User