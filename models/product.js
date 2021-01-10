const Cart = require('./cart')
const db = require('../utils/database')
// PRODUCT CLASS
class Product {
    constructor(id, title, price, description, imageUrl) {
        this.id = id
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        return db.execute('INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)',
            [this.title, this.price, this.description, this.imageUrl]
        )
    }

    static deleteById(id) {
        
    }

    static fetchAll(cb) {
        return db.execute('SELECT * FROM products')
    }

    static findById(id, cb) {
        
    }
}

module.exports = Product