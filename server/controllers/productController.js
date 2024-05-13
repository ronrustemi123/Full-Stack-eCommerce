const Products = require('../models/Products')
const mongoose = require('mongoose')

const allProducts = async (req, res) => {
    const products = await Products.find({})
    res.status(200).json(products)
}

const getCategories = async (req, res) => {
    const {category} = req.params

    if(category !== 'all') {
        const products = await Products.find({category})
        res.status(200).json(products)
    }else {
        const products = await Products.find({})
        res.status(200).json(products)
    }
}

const getProduct = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID not valid' })
    }

    const products = await Products.findById(id)

    if(!products) {
        return res.status(404).json({error: 'Could not find this product'})
    }

    res.status(200).json(products)
}

const addProduct = async (req, res) => {
    const {...products} = req.body

    try {
        const product = await Products.create(products)
        res.status(200).json(product)
    } catch (err) {
        res.status(400).json(err.message)
    }
}

module.exports = {
    allProducts,
    getCategories,
    getProduct,
    addProduct
}