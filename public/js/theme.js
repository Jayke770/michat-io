"use strict"
//icon 
const icon_sun = '<i style="color: #eab308;" class="flex justify-center items-center h-full"><i class="fa fa-sun"></i></i>'
const icon_moon = '<i style="color: #8523dd;" class="flex justify-center items-center h-full"><i class="fa fa-moon"></i></i>'

//get theme value from localstorage 
const theme = localStorage.getItem("michat-theme")
//set to default theme when localstorage is null or default
if(theme === null || theme === "default"){
    $("html").removeClass("dark")
    $("html").addClass("default")
    $("html").attr("michat-theme", "default")
    localStorage.setItem("michat-theme", "default")
    //set icon for toogle
    $(".darkmode_icon").html(icon_sun)

    //set toggle to false
    $(".theme").prop("checked", false)
}
//set to dark theme when localstorage value is set to dark
if(theme === "dark"){
    $("html").removeClass("default")
    $("html").addClass("dark")
    $("html").attr("michat-theme", "dark")
    localStorage.setItem("michat-theme", theme)
    //set icon for toogle
    $(".darkmode_icon").html(icon_moon)

    //set toggle to false
    $(".theme").prop("checked", true)
}

//when theme toggle is change 
$(".theme").change( function(){
    if($(this).prop("checked")){
        $("html").removeClass("default")
        $("html").addClass("dark")
        $("html").attr("michat-theme", "dark")
        localStorage.setItem("michat-theme", "dark")
        //set icon for toogle
        $(".darkmode_icon").html(icon_moon)
    }
    else{
        $("html").removeClass("dark")
        $("html").addClass("default")
        $("html").attr("michat-theme", "default")
        localStorage.setItem("michat-theme", "default")
        //set icon for toogle
        $(".darkmode_icon").html(icon_sun)
    }
})