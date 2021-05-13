const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

const DB_URL = 'mongodb+srv://primph:noobie@cluster0.n57br.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

app.get('/', (req, res) => {
    res.send('Hi')
})

app.listen(3000, () => {
    console.log("Server started running!")
})