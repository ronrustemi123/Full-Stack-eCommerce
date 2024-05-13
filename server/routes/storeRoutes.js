const express = require('express')

const router = express.Router()

const {allProducts, getCategories, getProduct, addProduct} = require('../controllers/productController')

router.get('/', allProducts)

router.get('/categories/:category', getCategories)

router.get('/product/:id', getProduct)


router.post('/', addProduct)

module.exports = router