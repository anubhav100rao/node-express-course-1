const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const PORT = 3000

app.use(express.json())

app.get('/hello', (req, res) => {
    res.send("Task Manager")
})

app.use('/api/v1/tasks/', tasks)

app.listen(PORT, console.log(`Sever is started at http://localhost:${PORT}/`))