'use strict'
$.ripple(".rpl", {
    debug: false,
    on: 'mousedown',
    opacity: 0.5,
    color: "#a5dc86",
    multi: false,
    duration: 0.7,
    rate: function(pxPerSecond) {
        return pxPerSecond;
    },
    easing: 'linear'
})