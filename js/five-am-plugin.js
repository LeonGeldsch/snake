var badgeWrapper = document.querySelector(".badge_wrapper");

var sectionGrey = document.querySelector(".section.grey");



window.addEventListener('scroll', function() {
    console.log(badgeWrapper.getBoundingClientRect().top, sectionGrey.getBoundingClientRect().top);

    if (badgeWrapper.getBoundingClientRect().top <= sectionGrey.getBoundingClientRect().top) {
        console.log("below");
    }

});