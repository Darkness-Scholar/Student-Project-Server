const express = require ('express')
const bodyParser = require ('body-parser')
const cors = require ('cors')
const mongoose = require ('mongoose')
const { Visitors } = require ('./model')

const visitors = require("./routes/visitors")
const auth = require('./routes/auth')

mongoose.connect("mongodb+srv://tungxm123:123qwe@cluster0.vtigv.mongodb.net/appData", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.get("/", (req, res) => {
    res.status(200).json("Hello World!")
})

app.use("/visitors", visitors)
app.use("/auth", auth)

app.listen(9999, () => {
    console.log("Server is running on port 9999")
})