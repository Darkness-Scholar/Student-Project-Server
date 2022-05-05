const express = require('express')
const { Visitors } = require('./../model')

var visitors = express.Router()

/**
 * @api {post -> object} /visitors/get-visitors: Get visitors by date
 * @param {string} date : năm - tháng - ngày
*/

visitors.post("/get-visitors", async (req, res) => {
    const date = req.body.date.slice(0, 10)
    console.log(`GET VISITORS AMOUNT: ${date}`)
    try {
        let data = await Visitors.findOne({ date: date })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ "message": "Date is not found" })
    }
})

/**
 * @api {get -> object} /visitors/get-visitors:  Get lastest visitors
*/

visitors.get("/get-lastest-visitors", async (req, res) => {
    let lastest = await Visitors.findOne({}).sort({$natural:-1}).limit(1)
    res.status(200).json(lastest)
})

/**
 * @api {post -> object} /visitors/set-visitors: Set new date - visitors
 * @param {string} date : năm - tháng - ngày
 * @param {number} amount : số lượng khách truy cập
*/

visitors.post("/set-visitors", async (req, res) => {
    const { date, amount } = req.body
    console.log(date, amount)
    const isDate = date.split('-')
    if (isDate.length == 3) { // Date is valid
        try {
            let data = await Visitors.create({ date, amount: Number(amount) })
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
            res.status(500).json({ "message": "This date is existed in database", error })
        }
    } else { // Date is not valid
        res.status(500).json({ "message": "This date or amount is not valid", error })
    }
})

visitors.delete("/delete-visitors", async (req, res) => {
    const { date } = req.body
    console.log(`DETELE VISITORS AMOUNT: `, date)
    try {
        let data = await Visitors.deleteOne({ date: date })
        res.status(200).json({ "message": "Delete success" })
    } catch (error) {
        res.status(500).json({ "message": "This date is not found", error })
    }
})

module.exports = visitors