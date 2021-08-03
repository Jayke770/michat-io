const mgse = require('mongoose')
const user = new mgse.Schema({
    userid: {
        type: String, 
        required: true
    }, 
})
module.exports = mgse.model('users', user)