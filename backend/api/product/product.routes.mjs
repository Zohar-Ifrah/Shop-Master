import express from 'express'
import { get, add, query, update, remove, removeAll } from './product.controller.mjs'

const router = express.Router()

console.log("product.routes")

router.get('/', query)
router.get('/:id', get)

router.post('/', add)
router.put('/:id', update)

router.delete('/:id', remove)
router.delete('/', removeAll)

export default router
