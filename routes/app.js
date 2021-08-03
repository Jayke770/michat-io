const express = require('express')
const app = express.Router()
const expressRatelimit = require('express-rate-limit')

//begin route 

//root route
app.get('/', async (req, res) => {
    return res.render("index")
})

//homepage 
app.get('/home', async (req, res) => {
    return res.render("home")
})

///post requests 

//login 
app.post('/login', async (req, res) => {
    
})
//export router
module.exports = app