require('../src/db/mongoose.js')
const Task = require('../src/model/task.js')

Task.findByIdAndDelete('61cf1973e8a6437eb374eea8').then(task => {
    console.log(task)
    return Task.countDocuments({})
}).then(result => {
    console.log(result)
}).catch(err => {
    console.log(err)
})