"use strict"
setInterval( () => {
    $(".time").html(moment().format('MMMM DD YYYY, h:mm:ss a'))
}, 1000)