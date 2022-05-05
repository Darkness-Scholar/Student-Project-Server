import express from "express"
import Visitors from "./model"

var main = express.Router()

main.post("/getDataByDate", async (req, res) => {
    // Server nhận dữ liệu ngày {date} từ client
    const { date } = req.body
    try {
        // Server Tìm kiếm dữ liệu của ngày {date} trong database rồi gửi về client
        let data = await Visitors.find({ date: date })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({"message": "Date is not found"})
    }
})

export default main