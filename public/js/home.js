'use strict'
$(document).ready(() => {
    //realtime media query 
    var screen = window.matchMedia("(max-width: 767px)")
    //comment icon click 
    $(".comment").click(function (e) {
        e.preventDefault()
        if (screen.matches) { 
            $(".cmts").removeClass("md:hidden")
            $(".cmts").addClass($(".cmts").attr("animate-in"))
            setTimeout( () => {
                $(".cmts").removeClass($(".cmts").attr("animate-in"))
            }, 500)
        }
    })
    //close comment form, will fire in mobile only 
    $(".close_cmt").click( () => {
        if (screen.matches) { 
            $(".cmts").addClass($(".cmts").attr("animate-out"))
            setTimeout( () => {
                $(".cmts").removeClass($(".cmts").attr("animate-out"))
                $(".cmts").addClass("md:hidden")
            }, 500)
        }
    })
})