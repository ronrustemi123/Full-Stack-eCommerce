const Cart = require('../models/Cart')

const addItems = async (req, res) => {
    const {title, price, quantity, img} = req.body
    try {
        const user_id = req.user._id
        const item = await Cart.create({user_id, title, price, quantity, img})
        res.status(200).json(item)
    } catch (err) {
        console.log(err)
        res.status(400).json({error: 'Item already in cart'})
    }
}

const getItems = async (req, res) => {
    const user_id = req.user._id
    const items = await Cart.find({user_id})
    res.status(200).json(items)
}

const deleteItem = async (req, res) => {
    const {id} = req.params

    const item = await Cart.findByIdAndDelete(id)
    res.status(200).json(item)
}



module.exports = {addItems, getItems, deleteItem}