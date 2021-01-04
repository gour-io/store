const express = require('express')
const bodyParser = require('body-parser');

const rootDir = require('./utils/path')

const path = require('path')

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const PORT = process.env.PORT || 3000;
const app = express()

app.use(bodyParser.urlencoded({extended: false}));

// Setting PUG template engine globally to our express application
app.set('view engine', 'pug');
app.set('views', 'views');

// Serving static files
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminData.routes)
app.use(shopRoutes)

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'))
})

app.listen(PORT)