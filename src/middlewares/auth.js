const User = require('../model/user')
const jwt = require('jsonwebtoken');

const auth = async (req,res,next) => {
    try{
        const token = req.get('authorization').replace('Bearer ','')
        const decode =await jwt.verify(token,process.env.JWT_SECRET)
        const user =await User.findOne({_id : decode._id,'tokens.token':token})
        if(!user){
            throw new Error('Please authorization !')
        }
        req.token = token
        req.user =user  // đặt giá trị luôn cho người dùng 
        next()
    }catch(err) {
        res.status(401).send('Please authorization !')
    }
}

module.exports = auth