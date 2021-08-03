const passport = require('passport')
const localStrategy = require('passport-local').Strategy 
const user = require('../models/users') 
module.exports = {
    authenticated: (req, res, next) => {
        const {username, password} = req.body 
        console.log(username, password)
    }
}