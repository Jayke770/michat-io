"use strict"
//testing purpose only 
localStorage.setItem("michat-theme", "dark")
//get theme value from localstorage 
const theme = localStorage.getItem("michat-theme")
//set to default theme when localstorage is null
if(theme === null){
    $("html").addClass("default")
    $("html").attr("michat-theme", "default")
    localStorage.setItem("michat-theme", "default")
}
//set to default theme when localstorage value is set to default
if(theme === "default"){
    $("html").addClass("default")
    $("html").attr("michat-theme", "default")
    localStorage.setItem("michat-theme", theme)
}
//set to dark theme when localstorage value is set to dark
if(theme === "dark"){
    $("html").addClass("dark")
    $("html").attr("michat-theme", "dark")
    localStorage.setItem("michat-theme", theme)
}