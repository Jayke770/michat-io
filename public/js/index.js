'use strict'
$(document).ready(() => {
    //open signup form
    $(".open_sign_up").click(function (e) {
        e.preventDefault()
        $(".sign_up").removeClass("hidden")
        $(".sign_up").addClass("grid")
        $(".signup_main").addClass($(".signup_main").attr("animate-in"))
        setTimeout(() => {
            $(".signup_main").removeClass($(".signup_main").attr("animate-in"))
        }, 900)
    })

    //close signup form
    $(".close_signup").click(function (e) {
        e.preventDefault()
        $(".signup_main").addClass($(".signup_main").attr("animate-out"))
        setTimeout(() => {
            $(".signup_main").removeClass($(".signup_main").attr("animate-out"))
            $(".sign_up").addClass("hidden")
            $(".sign_up").removeClass("grid")
        }, 900)
    })
})