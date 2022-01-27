require('../src/db/mongoose')
const User = require('../src/model/user.js')

// User.findByIdAndUpdate('61cf12bd04f48b5a373da805',{name: 'new update'}).then( user => {
//     console.log(user)
//     return User.countDocuments({_v:0})
// }).then( results => {
//     console.log(results)
// }).catch(err => {
//     console.log(err)
// })

// async findAndUpdate(id,name){
//     const update = await User.findByIdAndUpdate(id,{name})
//     const count = await User.countDocuments({id})
//     return count
// }

const findAndUpdate = async (id,name) =>{
    const update = await User.findByIdAndUpdate(id,{name})
    const count = await User.countDocuments({id})
    const result =await Promise.all([setTimeout(()=>{update},5000),setTimeout(()=>{count},2000)])
    return result[1]
}

findAndUpdate('61cf12bd04f48b5a373da805','hello new update25555').then(user => {
    console.log(user)
}).catch(err => {
    console.log(err)
})

