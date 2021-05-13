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

app.get('/', async (req, res) => {
    const employees = await Employee.find({})
        .then(() => res.send(employees))
        .catch(err => console.log(err))
})

app.post('/send-data', async (req, res) => {
    const employee = new Employee(req.body)
    await employee.save()
        .then(() => {
            console.log(employee)
            res.send("Posted")
        })
        .catch(err => console.log(err))
})

app.post('/delete', async (req, res) => {
    await Employee.findByIdAndDelete(req.body.id)
        .then(data => {
            console.log(data)
            res.send('Deleted')
        })
        .catch(err => console.log(err))

})

app.post('/update', async (req, res) => {
    const { id } = req.body
    await Employee.findByIdAndUpdate(id, { ...req.body })
        .then(data => {
            console.log(data)
            res.send(data)
        })
        .catch(err => console.log(err))
})

app.listen(3000, () => {
    console.log("Server started running!")
})