const express = require('express')
const app = express.Router()
const expressRatelimit = require('express-rate-limit')
const {authenticated: islogged} = require('./passport')

//begin route 

//root route
app.get('/', async (req, res) => {
    delete req.session.sam
    return res.render("index")
})

//homepage 
app.get('/home', async (req, res) => {
    return res.render("home")
})

///post requests 

//login 
app.post('/login', islogged, async (req, res) => {
    const {username, password} = req.body 
    console.log(req.username)
})
//export router
module.exports = app