'use strict'
$(document).ready(() => {
    //realtime media query 
    var size = window.matchMedia("(max-width: 767px)")
    screen(size) // Call listener function at run time
    size.addListener(screen)
    async function screen() {
        if (size.matches) { 
            return true
            
        }
        else{
            return false
        }
    }
    //comment icon click 
    $(".comment").click(function (e) {
        e.preventDefault()
        if(screen()){
            $(".nty_msg").removeClass("md:hidden")
            $(".michat_cmts").addClass(`${$(".michat_cmts").attr("animate-in-mobile")} ms-500`)
            setTimeout( () => {
                $(".michat_cmts").removeClass(`${$(".michat_cmts").attr("animate-in-mobile")} ms-500`)
            }, 500)
        }
    })
    //close comment form, will fire in mobile only 
    $(".close_cmt").click( () => {
        if(screen()){
            $(".michat_cmts").addClass(`${$(".michat_cmts").attr("animate-out-mobile")} ms-500`)
            setTimeout( () => {
                $(".michat_cmts").removeClass(`${$(".michat_cmts").attr("animate-out-mobile")} ms-500`)
                $(".nty_msg").addClass("md:hidden")
            }, 500)
        }
    })
})