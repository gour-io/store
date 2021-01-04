const express = require('express')
const path = require('path')
const rootDir = require('../utils/path')
const adminData = require('./admin')
console.log(rootDir)

const Router = express.Router()

Router.get('/',(req, res) => {
    const products = adminData.products;
    res.render('shop', {prods: products, docTitle: "Shop", path:"/"})    
})

module.exports = Router;
