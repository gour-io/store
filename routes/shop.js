const express = require('express')
const path = require('path')
const rootDir = require('../utils/path')
const adminData = require('./admin')

const Router = express.Router()

Router.get('/',(req, res) => {
    const products = adminData.products;
    res.render('shop', {
        prods: products, 
        docTitle: "Shop", 
        path:"/", 
        hasProducts: products.length > 0,
        activeShop: true,
        // layout: false,      --not use default layout

    })    
})

module.exports = Router;
