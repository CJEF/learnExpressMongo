const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// const port = 3000

const Post = require('./models/post')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    Post.find({}).then(posts => { // в БД постс находятся все записи и они передаются в index.ejs и далее перебором на стену
        res.render('index', {posts: posts}) 
    })
})

app.get('/create', (req, res) => res.render('create'))
app.post('/create', (req, res) => {
    const {title, body} = req.body
    
    Post.create({
        title,
        body
    }).then(post => console.log(post._id))

    res.redirect('/')
})

module.exports = app