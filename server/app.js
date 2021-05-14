const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Employee = require('./Employee')

const app = express()

app.use(bodyParser.json())

const DB_URL = YOUR_DB_URL

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB Connected")
})

app.get('/', (req, res) => {
    Employee.find({})
        .then(data => res.send(data))
        .catch(err => console.log(err))
})

app.post('/send-data', (req, res) => {
    const employee = new Employee(req.body)
    employee.save()
        .then((data) => {
            res.send(data)
        })
        .catch(err => console.log(err))
})

app.post('/delete', (req, res) => {
    Employee.findByIdAndRemove(req.body.id)
        .then(data => {
            console.log(data)
            res.send(data)
        })
        .catch(err => console.log(err))

})

app.post('/update', (req, res) => {
    const { id } = req.body
    Employee.findByIdAndUpdate(id, { ...req.body })
        .then(data => {
            console.log(data)
            res.send(data)
        })
        .catch(err => console.log(err))
})

app.listen(3000, () => {
    console.log("Server started running!")
})