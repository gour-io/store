const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', { 
        docTitle: 'Add Product', 
        path: '/admin/add-product', 
        productCSS: true,
        activeAddProduct: true
    })
}

exports.postAddProduct = (req, res) => {
    const product = new Product(req.body.title)
    product.save()
    res.redirect('/')
}

exports.getProducts = (req, res) => {
    Product.fetchAll((products) => {
        res.render('shop', {
            prods: products, 
            docTitle: "Shop", 
            path:"/", 
            hasProducts: products.length > 0,
            activeShop: true,
            // layout: false,      --not use default layout
        })    
    })  
}

