var badgeWrapper = document.querySelector(".badge_wrapper");

var badge = document.querySelector(".badge_wrapper img");

var sectionGrey = document.querySelector(".section.grey");

var menuGradientLight = document.querySelector(".menu_gradient.light");

var popUpMenu = document.querySelector(".pop-up-menu");

var menuLinks = document.querySelector(".menu_links");

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
    console.log('click');
    popUpMenu.style.opacity = 0;


    burgerUpper.style.transform = "translate3d(0px, 0px, 0px)";
    burgerUpper.style.transform = "translate3d(0px, 0px, 0px)";
    burgerLower.style.transform = "translate3d(0px, 0px, 0px)";
    burgerLower.style.transform = "translate3d(0px, 0px, 0px)";
})


/*
height: 2px; 
transform: translate3d(0px, 0px, 0px) 
scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg); 
transform-style: preserve-3d;
*/