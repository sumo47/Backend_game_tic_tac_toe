const express = require('express')
const mongoose = require('mongoose')
const route = require('./routes/route')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://sumit:sumit@cluster0.8dflsuw.mongodb.net/tic_toc_toe_game')
    .then(() => {
        console.log("MongooDb connected successfully")
    })
    .catch((err) => {
        console.log(err.message)
    })

app.use('/', route)

const port = 4000;

app.listen(port, () => { console.log(`Server is running on port no ${port}`) })