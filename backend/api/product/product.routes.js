const express = require('express')
const { get, add, query, update, remove, removeAll } = require('./product.controller')
const router = express.Router()

console.log("product.routes")

router.get('/', query)
router.get('/:id', get)

router.post('/', add)
router.put('/:id', update)

router.delete('/:id', remove)
router.delete('/', removeAll)

module.exports = router
