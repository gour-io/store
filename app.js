const express = require('express')
const bodyParser = require('body-parser')

const rootDir = require('./utils/path')
const db = require('./utils/database')

const path = require('path')

const { get404 } = require('./controllers/error')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

db.execute('SELECT * FROM products')
    .then((result, fields) => {
        console.log(result[0][0].price)
    })
    .catch(err => console.log(err))

const PORT = process.env.PORT || 3000;
const app = express()

app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'ejs')
app.set('views', 'views')

// Serving static files
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(get404)

app.listen(PORT)