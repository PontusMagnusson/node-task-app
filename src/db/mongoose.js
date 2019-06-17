const mongoose = require('mongoose')
const connectionString = process.env.MONGODB_CONNECTION_STRING

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
