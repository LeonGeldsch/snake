var body = document.querySelector("body");

var badgeWrapper = document.querySelector(".badge_wrapper");

var badge = document.querySelector(".badge_wrapper img");

var sectionGrey = document.querySelector(".section.grey");

var menuGradientLight = document.querySelector(".menu_gradient.light");

var popUpMenu = document.querySelector(".pop-up-menu");

var menuLinks = document.querySelector(".menu_links");

var menuWrapper = document.querySelector(".menu-wrapper");

var burgerUpper = document.querySelector(".burger.upper");

var burgerLower = document.querySelector(".burger.lower");

window.addEventListener('scroll', function() {
    if (parseInt(badgeWrapper.getBoundingClientRect().top) >= parseInt(sectionGrey.getBoundingClientRect().top) && parseInt(badgeWrapper.getBoundingClientRect().top) <= parseInt(sectionGrey.getBoundingClientRect().top) + parseInt(sectionGrey.offsetHeight)) {
        badge.style.filter = "invert()";
    } else {
        badge.style.filter = "none";
    }
});

menuGradientLight.addEventListener("click", function() {
    menuWrapper.click();
});


//<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/gsap.min.js"></script>

var gsapScript = document.createElement("script");

gsapScript.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/gsap.min.js");

body.appendChild(gsapScript);



gsap.to(badgeWrapper, {
    x: -200,
    y:-200,
    duration: 1
});