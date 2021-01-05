const express = require('express')
const bodyParser = require('body-parser')

const rootDir = require('./utils/path')

const path = require('path')

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const PORT = process.env.PORT || 3000;
const app = express()

app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'ejs')
app.set('views', 'views')

// Serving static files
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminData.routes)
app.use(shopRoutes)

app.use((req, res, next) => {
    res.status(404).render('404', {docTitle: '404 Not Found', path})
    // res.status(404).sendFile(path.join(rootDir, 'views', '404.html'))
})

app.listen(PORT)