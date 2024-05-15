const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cartSchema = new Schema({
    user_id: {
        type: String,
        required: true 
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true 
    },
    quantity: {
        type: Number,
        required: true 
    },
    img: {
        type: String,
        required: true
    }
}, {timestamps: true})

cartSchema.path('title').unique(false);

module.exports = mongoose.model('Cart', cartSchema)