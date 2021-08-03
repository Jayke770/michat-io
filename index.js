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
const mongoose = require('mongoose')
const session = require('express-session')
const mongodbStore = require('connect-mongodb-session')(session)
const cors = require('cors')
const bodyParser = require('body-parser') // for parsing <form> 
const multer = require('multer')
const upload = multer() // for parsing form-data

//connect to mongodb database 
mongoose.connect(process.env.michatdb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
//session store 
const dbStore = new mongodbStore({
    uri: process.env.michatdb,
    collection: 'sessions', 
    expires: 1000 * 60 * 60 * 24 * 30,
    connectionOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 10000
    }
})
dbStore.on('error', (e) => {
    console.log(e)
})



//app middlewares
const middlewares = [
    express.static(dir),
    express.json(),
    cors(), 
    bodyParser.json(),
    bodyParser.urlencoded({extended: true}),
    upload.array()
]
//session settings
const michatSessions = (session({
    name: "michat-session",
    secret: process.env.secret,
    store: dbStore,
    resave: false,
    saveUninitialized: true
}))
app.use(middlewares)
app.use(michatSessions)
//template engine 
app.set('view engine', 'ejs')


//app routes 
app.use(appRoute)

//404 not found
app.use(function(req, res, next) {
    res.status(404).send("404 NOT FOUND")
})



const server = http.listen(process.env.PORT || 8989, () =>{
    console.log("Listening on " + server.address().address, server.address().port)
})