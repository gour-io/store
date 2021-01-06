const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', { 
        docTitle: 'Add Product', 
        path: '/admin/add-product', 
        productCSS: true,
        activeAddProduct: true
    })
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            prods: products, 
            docTitle: "Admin Products", 
            path:"/admin/products", 
            hasProducts: products.length > 0,
            activeShop: true,
            // layout: false,      --not use default layout
        })    
    })
}

exports.postAddProduct = (req, res) => {
    const { title, imageUrl, price, description } = req.body;
    const product = new Product(title, imageUrl, price, description)
    product.save()
    res.redirect('/')
}