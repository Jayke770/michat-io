if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express') 
const app = express() 
const http = require('http').createServer(app) 
const io = require('socket.io')(http)
const path = require('path')
const dir = path.join(__dirname, './public')
const appRoute = require('./routes/app')

//app settings
app.use(express.static(dir))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

//template engine 
app.set('view engine', 'ejs')

//app routes 
app.use(appRoute)
//404 not found
app.use(function(req, res, next) {
    res.status(404).send("404 NOT FOUND")
})

const server = http.listen(process.env.PORT || 3000, () =>{
    console.log("Listening on " + server.address().address, server.address().port)
})