const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const tasks = require('./routes/tasks')
const PORT = process.env.PORT || 3000
require('dotenv').config()
// const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.static('./public'))
app.use(express.json())

app.get('/hello', (req, res) => {
    res.send("Task Manager")
})

app.use('/api/v1/tasks/', tasks)

// app.use(notFound)
app.use(errorHandlerMiddleware)

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log("DB CONNECTED...")
        app.listen(PORT, console.log(`Sever is started at http://localhost:${PORT}/`))
    } catch(err) {
        console.log(err)
    }
}

start()