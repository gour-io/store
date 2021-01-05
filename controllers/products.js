const products = []

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', { 
        docTitle: 'Add Product', 
        path: '/admin/add-product', 
        productCSS: true,
        activeAddProduct: true
    })
}

exports.postAddProduct = (req, res) => {
    products.push({title: req.body.title})
    console.log(req.body)
    res.redirect('/')
}

exports.getProducts = (req, res) => {
    res.render('shop', {
        prods: products, 
        docTitle: "Shop", 
        path:"/", 
        hasProducts: products.length > 0,
        activeShop: true,
        // layout: false,      --not use default layout
    })    
}

