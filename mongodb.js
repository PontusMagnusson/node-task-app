const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        return console.log('Unable to connect to database')
    }

    console.log(`Connected successfully to ${connectionUrl}`)

    const db = client.db(databaseName)

    // db.collection('users').insertOne({
    //     name: 'Pontus',
    //     age: 24
    //   }, (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert user')
    //     }

    //     console.log(result.ops)
    //   })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Sven',
    //         age: 30
    //     },
    //     {
    //         name: 'Jessica',
    //         age: 26
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         console.log('Failed to insert documents')
    //     }

    //     console.log(result.ops)
    // })

    db.collection('tasks').insertMany([
        {
            description: 'Vacuum floors',
            completed: false
        },
        {
            description: 'Iron shirts',
            completed: true
        },
        {
            description: 'Walk dog',
            completed: false
        }
    ], (error, result) => {
        if (error) {
            return console.log('Failed to insert documents')
        }

        console.log(result.ops)

    })
})