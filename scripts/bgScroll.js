var previousScroll = 0;

function bgScroll() {
  if (window.innerWidth < 800) return;
  //let time = Math.sin(Date.now() * 0.001) * 40.0;

  var reveals = document.querySelectorAll(".scroll-bg");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var parallax = window.getComputedStyle(reveals[i]).getPropertyValue("--parallax");
    var offset = 100 -Math.max(Math.min((elementTop - windowHeight) * -0.01 * parallax, 100), 0);
    
    reveals[i].style.setProperty("background-position-y", offset + "%");
  }

  reveals = document.querySelectorAll(".scroll-bg-fixed");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = document.documentElement.scrollTop;
    var parallax = window.getComputedStyle(reveals[i]).getPropertyValue("--parallax");
    var offset = 100 -Math.max(Math.min((elementTop - windowHeight) * -0.01 * parallax, 100), 0);
    
    reveals[i].style.setProperty("background-position-y", offset + "%");
  }

  reveals = document.querySelectorAll(".scroll-element");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var parallax = window.getComputedStyle(reveals[i]).getPropertyValue("--parallax");
    var offset = Math.max(Math.min((elementTop - windowHeight * 0.5) * -0.01 * parallax, 40), -40);
    
    reveals[i].style.transform = "translateY(" + offset + "%)";
  }
}
    
setInterval(bgScroll, 1000);
window.addEventListener("scroll", bgScroll);
bgScroll();