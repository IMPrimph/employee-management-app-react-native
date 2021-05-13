const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Employee = require('./Employee')

const app = express()

app.use(bodyParser.json())

const DB_URL = 'mongodb+srv://primph:noobie@cluster0.n57br.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB Connected")
})

app.get('/', (req, res) => {
    res.send('Hi')
})

app.post('/send-data', async (req, res) => {
    const employee = new Employee(req.body)
    await employee.save().then(() => console.log(employee))
    res.send('Posted')
})

app.listen(3000, () => {
    console.log("Server started running!")
})