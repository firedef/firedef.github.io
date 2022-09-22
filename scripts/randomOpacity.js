var grid = [3,3];

function animateMe(){
    gsap.to(".blink", {
        duration: 1,
        background: "#434755",
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: {
            amount: 5.0, 
            grid: grid,
            from: "random"
        }
    })
}
animateMe();