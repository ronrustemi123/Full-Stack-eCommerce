const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productsSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    specs: {
        type: String
    },
    texture: {
        type: String
    },
    weight: {
        type: String 
    },
    size: {
        type: String
    }
})

module.exports = mongoose.model('Products', productsSchema)