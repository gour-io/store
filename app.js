const express = require('express')
const bodyParser = require('body-parser')

const rootDir = require('./utils/path')
const sequelize = require('./utils/database')

const path = require('path')

const { get404 } = require('./controllers/error')

// routers
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

//models
const User = require('./models/user');
const Product = require('./models/product')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')

const PORT = process.env.PORT || 3000;
const app = express()

app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'ejs')
app.set('views', 'views')

// Serving static files
app.use(express.static(path.join(__dirname, 'public')))

// middleware adding user sequelize object to all request
app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            return req.user = user
        })
        .then(result => {
            next()
        })
        .catch(err => console.log(err))
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(get404)


Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'})
User.hasMany(Product)
User.hasOne(Cart)
Product.belongsToMany(Cart, { through: CartItem })
Cart.belongsToMany(Product, { through: CartItem })


sequelize
    .sync({force: true})
    // .sync()
    .then(result => { 
        return User.findByPk(1);
    })
    .then(user => {
        if(!user) {
            return User.create({name: "Deepak", email: 'goodman@gmail.com'})
        }
        return user; // then always return promise, explicit return promise like "Promise.resolve(user)" 
    })
    .then(user => {
        // console.log(user) 
        app.listen(PORT)
    })
    .catch(err => console.log(err))