const express = require('express');//1
const aiRoutes = require('./routes/ai.routes')
const cors = require('cors')

const app = express()//2

app.use(cors()) // for cross-origin resource sharing


app.use(express.json()) //for body parsing

app.get('/', (req, res) => { //testing line
    res.send('Hello World')
})

app.use('/ai', aiRoutes)

module.exports = app//3