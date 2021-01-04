const express = require('express')
const path = require('path')
const rootDir = require('../utils/path')

const products = []

const router = express.Router()

//  /admin/add-product GET 
router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
})

//  /admin/add-product POST 
router.post('/add-product', (req, res) => {
    products.push({title: req.body.title})
    console.log(req.body)
    res.redirect('/')
})

exports.routes = router
exports.products = products