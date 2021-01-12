const express = require('express')
const bodyParser = require('body-parser')

const rootDir = require('./utils/path')
const sequelize = require('./utils/database')

const path = require('path')

const { get404 } = require('./controllers/error')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

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

sequelize.sync()
    .then(result => {
        // console.log(result)
        app.listen(PORT)
    })
    .catch(err => console.log(err))