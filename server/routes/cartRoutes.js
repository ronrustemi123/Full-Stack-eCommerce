const express = require('express')

const router = express.Router()

const {addItems, getItems, deleteItem} = require('../controllers/cartController')
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

router.post('/', addItems)
router.get('/', getItems)
router.delete('/:id', deleteItem)

module.exports = router