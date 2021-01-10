const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', { 
        pageTitle: 'Add Product', 
        path: '/admin/add-product', 
        editing: false
    })
}

exports.postAddProduct = (req, res) => {
    const { title, price, description, imageUrl } = req.body;
    const product = new Product(null, title, price, description, imageUrl)
    product
        .save()
        .then(() => {
            res.redirect('/')
        })
        .catch(err => console.log(err))
}

exports.getEditProduct = (req, res, next) => {
    const editMode = Boolean(req.query.edit)
    if(!editMode) {
        return res.redirect('/')
    }
    const productId = req.params.productId
    Product.findById(productId, product => {
        if(!product) {
            return res.send('<code>Product id is not valid.</code>')
        }
        res.render('admin/edit-product', { 
            pageTitle: 'Edit Product', 
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        })

    })
}

exports.postEditProduct = (req, res, next) => {
    const { 
        productId, 
        title, 
        imageUrl, 
        price, 
        description 
    } = req.body
    
    const prodId = productId
    const updatedTitle = title
    const updatedImageUrl = imageUrl
    const updatedPrice = price
    const UpdatedDescription = description

    const updatedProduct = new Product (
        prodId, 
        updatedTitle, 
        updatedImageUrl, 
        updatedPrice, 
        UpdatedDescription
    )
    updatedProduct.save()
    res.redirect('/admin/products')
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            prods: products, 
            pageTitle: "Admin Products", 
            path:"/admin/products", 
            hasProducts: products.length > 0,
            activeShop: true,
            // layout: false,      --not use default layout
        })    
    })
}

exports.deleteProduct = (req, res, next) => {
    const prodId = req.body.productId
    Product.deleteById(prodId)
    res.redirect('/admin/products')
}

