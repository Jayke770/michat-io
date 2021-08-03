'use strict'
let creating = false
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

    //signup 
    $(".michat-create").submit(function(e){
        e.preventDefault()
        if(!creating){
            Swal.fire({
                backdrop: true, 
                showConfirmButton: false, 
                willOpen: () => {
                    Swal.showLoading()
                    $.ajax({
                        xhr : function() {
                            var xhr = new window.XMLHttpRequest()
                            xhr.upload.addEventListener('progress', function(e) {
                                if (e.lengthComputable) {
                                    var percent = Math.round((e.loaded / e.total) * 100)
                                    console.log(percent)
                                }
            
                            });
                            return xhr;
                        },
                        url: 'login/', 
                        method: 'POST', 
                        cache: false,
                        timeout: 5000,
                        processData : false,
                        contentType : false,
                        data: new FormData(this),
                        success: (data) => {
                            if(data.status){
                                Swal.fire({
                                    icon: 'success', 
                                    title: data.text, 
                                    allowOutsideClick: false, 
                                    backdrop: true
                                })
                            }
                            else{
                                Swal.fire({
                                    icon: 'error', 
                                    title: data.text, 
                                    allowOutsideClick: false, 
                                    backdrop: true
                                })
                            }
                        }, 
                        error: (data) => {
                            if(data.statusText === "timeout"){
                                Swal.fire({
                                    icon: 'info', 
                                    title: 'Request Timeout', 
                                    allowOutsideClick: false, 
                                    backdrop: true
                                })
                            }
                        }
                    })
                }, 
                allowOutsideClick: () => !Swal.isLoading()
            })
        }
    })
})