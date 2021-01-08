const express = require('express')
const { 
    getAddProduct, 
    postAddProduct,
    postEditProduct, 
    getProducts, 
    getEditProduct,
    deleteProduct
} = require('../controllers/admin')

const router = express.Router()

//  /admin/add-product GET 
router.get('/add-product', getAddProduct)

//  /admin/products GET 
router.get('/products', getProducts)

//  /admin/add-product POST 
router.post('/add-product', postAddProduct)

//  /admin/edit-product/:id?editing=true&key=value&... get 
router.get('/edit-product/:productId', getEditProduct)

// /admin/edit-product POST
router.post('/edit-product', postEditProduct)

// /admin/delete-product delete
router.post('/delete-product', deleteProduct)

module.exports = router;
