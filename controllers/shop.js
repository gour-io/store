const Product = require('../models/product')

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-lists', {
            prods: products, 
            docTitle: "All Products", 
            path:"/"
        })    
    })  
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products, 
            docTitle: "Shop", 
            path:"/", 
            hasProducts: products.length > 0,
            activeShop: true,
            // layout: false,      --not use default layout
        })    
    })  
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        docTitle: 'Your Cart'
    })
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        docTitle: 'Your Orders'
    })
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        docTitle: 'Checkout'
    })
}