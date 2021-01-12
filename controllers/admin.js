const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', { 
        pageTitle: 'Add Product', 
        path: '/admin/add-product', 
        editing: false
    })
}

exports.postAddProduct = (req, res) => {
    const { title, price, imageUrl, description } = req.body;
    // magic association method User.createProduct({})
    console.log(req.user)
    req.user.createProduct({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    })
    .then(result => {
            console.log("created product successfully")
            res.redirect('/admin/products')
        })
        .catch(err => console.log(err))
}

exports.getEditProduct = (req, res, next) => {
    const editMode = Boolean(req.query.edit)
    if(!editMode) {
        return res.redirect('/')
    }
    const prodId = req.params.productId
    // Product.findByPk(productId)
    req.user.getProducts({where: {id: prodId}})
        .then(products => {
            const product = products[0]
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
        .catch(err => console.log(err))
}

exports.postEditProduct = (req, res, next) => {
    const { 
        productId, 
        title, 
        imageUrl, 
        price, 
        description 
    } = req.body

    Product.findByPk(productId)
        .then(product => {
            product.title = title
            product.price = price
            product.imageUrl = imageUrl
            product.description = description
            return product.save()
        })
        .then(result => {
            console.log('Updated product.')
            res.redirect('/admin/products')
        })
        .catch(err => console.log(err))
}

exports.getProducts = (req, res, next) => {
    // Product.findAll()
    req.user.getProducts()
        .then(products => {
            res.render('admin/products', {
                prods: products, 
                pageTitle: "Admin Products", 
                path:"/admin/products", 
                hasProducts: products.length > 0,
                activeShop: true,
                // layout: false,      --not use default layout
            })    
        })
        .catch(err => console.log(err))
}

exports.deleteProduct = (req, res, next) => {
    const prodId = req.body.productId
    Product.findByPk(prodId)
        .then(product => {
            return product.destroy()
        })
        .then(result => {
            console.log('deleted product')
            res.redirect('/admin/products')
        })
        .catch(err => console.log(err))
}

