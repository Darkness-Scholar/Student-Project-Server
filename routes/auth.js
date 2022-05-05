const express = require('express')
var auth = express.Router()

auth.post("/login", async (req, res) => {
    let { username, password } = req.body
    console.log(`LOGIN:`, username, password)
    if (username == "admin" && password == "admin") {
        res.status(200).json({ username, password })
    } else {
        res.status(400).json({ "message": "Login fail" })
    }
})

module.exports = auth