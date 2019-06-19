const express = require('express')
require('./db/mongoose') // Connect to database
const UserRouter = require('./routers/user')
const TaskRouter = require('./routers/task')

// Configure app
const app  = express()
app.use(express.json())

// Register routers
app.use(UserRouter)
app.use(TaskRouter)

module.exports = app
