const fs = require('fs')
const path = require('path')

const p = path.join(
    path.dirname(require.main.filename), 
    'data', 
    'product.json'
);

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if(err) {
           cb([])
        } else {
            cb(JSON.parse(fileContent))
        }
    })
}

// PRODUCT CLASS
class Product {
    constructor(title, imageUrl, price, description) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        // generate id and add to object
        this.id = parseInt((Math.random() * 1000)).toString()

        getProductsFromFile(products => {
            products.push(this)
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err)
            })
        })
        
    }

    static fetchAll(cb) {
        getProductsFromFile(cb)
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id)
            cb(product)
        })
    }
}

module.exports = Product