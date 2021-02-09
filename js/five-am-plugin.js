var badgeWrapper = document.querySelector(".badge_wrapper");

var badge = document.querySelector(".badge_wrapper img");

var sectionGrey = document.querySelector(".section.grey");

console.log(badge);

window.addEventListener('scroll', function() {
    //console.log(badgeWrapper.getBoundingClientRect().top, sectionGrey.getBoundingClientRect().top);
    if (parseInt(badgeWrapper.getBoundingClientRect().top) >= parseInt(sectionGrey.getBoundingClientRect().top)) {
        badge.style.filter = "invert()";
    }
});