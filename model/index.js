const mongoose = require ('mongoose')

const Schema = mongoose.Schema

const VisitorsSchema = new Schema({
    date: { type: String, required: true, unique: true },
    amount: { type: Number, default: 0 },
}, { timestamps: true, collection: 'visitors' })

const Visitors = mongoose.model('visitors', VisitorsSchema)
module.exports = { Visitors }
