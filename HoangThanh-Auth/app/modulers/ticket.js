const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true       
    },
    date: {
        type: String,
        require: true
    },
    adult: {
        type: Number,
        require: true
    },
    child: {
        type: Number,
        require: true
    },  
    fee: {
        type: Number,
        require: true
    }, 
    isCollected: {
        type: Boolean,
        default: false
    },
    isExpired: {
        type: Boolean,
        default: false
    }
})

const Ticket = mongoose.model('Ticket', ticketSchema)
module.exports = Ticket