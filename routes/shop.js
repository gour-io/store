const express = require('express')

const { 
    getIndex, 
    getProducts,
    getProduct, 
    getCart,
    getOrders,
    postCart, 
    getCheckout 
} = require('../controllers/shop')

const router= express.Router()

router.get('/', getIndex)

router.get('/products', getProducts)

router.get('/products/:productId', getProduct)

router.get('/cart', getCart)

router.post('/cart', postCart)

router.get('/order', getOrders)

router.get('/checkout', getCheckout)

module.exports = router
