const express = require('express')
require('./db/mongoose') // Connect to database
const UserRouter = require('./routers/user')
const TaskRouter = require('./routers/task')

// Configure app
const app  = express()
const port = process.env.PORT || 3000
app.use(express.json())

// Register routers
app.use(UserRouter)
app.use(TaskRouter)


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
