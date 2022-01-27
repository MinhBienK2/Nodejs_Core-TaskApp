// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient
// const ObjectId = mongodb.ObjectId
const {MongoClient,ObjectId}  = require('mongodb')
// Connection URL
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client) => {
//     if(error) {
//         return console.log(error)
//     }
//     const db = client.db(databaseName)
//     db.collection('users').insertOne({
//         name:'bien',
//         age:18
//     },(error,result) => {
//         if(error) {
//             return console.log(error)
//         }
//         console.log(result.ops)
//     })
// })

MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{
    if(error) {
        return console.log(error)
    }
    const db = client.db(databaseName)

    // insert 
    // db.collection('users').insertMany([
    //     {
    //         name:'huy',
    //          age:26
    //     },
    //     {   
    //         name:'bien',
    //         age:18
    //     }
    // ],(error,result) => {
    //     if(error){
    //         return console.log(error)
    //     }
    //     console.log(result)
    // })

    // find
    // db.collection('users').findOne({_id: new ObjectId("61c28d79869cb45ed3e49f49"),name:'huy'},(error,use) => {
    //     if(error){
    //         return console.log(error)
    //     }
    //     console.log(use)
    // })
    
    // db.collection('users').find({_id: new ObjectId("61c28d79869cb45ed3e49f49"),name:'huy'}).toArray((error,use) => {
    //     if(error){
    //         return console.log(error)
    //     }
    //     console.log(use)
    // })

    //update
//    db.collection('users').updateOne(
//        {_id: new ObjectId("61c20a1824a581b0a1fccc01")},
//        {
//            $set : {
//                name:'hello'
//            }
//        })
//    .then(user =>{
//         console.log(user)
//     }).catch(error =>{
//        console.log(error)
//    })
    // db.collection('users').updateMany(
    //     {name:'chien'},
    //     {
    //         $set:{
    //             name:'bien',
    //             age:29
    //         }
    //     }).then(user =>{
    //         console.log(user)
    //     }).catch(error => {
    //         console.log(error)
    //     })

    //delete
    // db.collection('users').deleteOne(
    //     {
    //     name:'bien'
    //     }).then(user => {
    //         console.log(user)
    //     })
    //     .catch(error =>{
    //         console.log(error)
    //     })
    db.collection('users').deleteMany({
        name:'huy'
    }).then(user =>{
        console.log(user)
    }).catch(error =>{
        console.log(error)
    })
})