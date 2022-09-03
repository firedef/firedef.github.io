window.onpageshow = function() {
    var objs = document.querySelectorAll(".loader");
    for (var i = 0; i < objs.length; i++) 
        objs[i].classList.remove("unloaded");
}
window.onbeforeunload = function() {
    var objs = document.querySelectorAll(".loader");
    for (var i = 0; i < objs.length; i++) 
        objs[i].classList.add("unloaded");
}

function openPage(url) {
   
    window.open(url, "_self");
}