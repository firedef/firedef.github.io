function bgScroll() {
    var reveals = document.querySelectorAll(".scroll-bg");
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var parallax = window.getComputedStyle(reveals[i]).getPropertyValue("--parallax");
      var offset = 100 -Math.max(Math.min((elementTop - windowHeight) * -0.01 * parallax, 100), 0);
      
      reveals[i].style.backgroundPositionY = offset + "%";
    }

    reveals = document.querySelectorAll(".scroll-element");
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var parallax = window.getComputedStyle(reveals[i]).getPropertyValue("--parallax");
      var offset = Math.max(Math.min((elementTop - windowHeight * .5) * -0.01 * parallax, 20), -20);
      
      reveals[i].style.transform = "translateY(" + offset + "%)";
    }
  }
    
  window.addEventListener("scroll", bgScroll);
  bgScroll();