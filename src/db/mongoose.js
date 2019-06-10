const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value))
            {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain the word "password"')
            }
        }
    },  
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be a positive number')
            } 
        }
    }
})

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

// const me = new User( {
//      name: '   Pontus    ',
//      email: '    pontus.magnusson@protonmail.com      ',
//      password: 'supersecurepassphrase      '
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log(error)
// })

const newTask = new Task({
    description: 'Learn some more mongoose',
    completed: true
})

newTask.save().then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})