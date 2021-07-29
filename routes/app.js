const express = require('express')
const app = express.Router()
const expressRatelimit = require('express-rate-limit')

//begin route 
app.get('/', async (req, res) => {
    return res.render("index")
})

//export router
module.exports = app