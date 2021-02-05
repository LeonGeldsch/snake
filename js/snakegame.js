var snake = document.querySelector(".snake");

var allSnakeBodyElements = document.querySelectorAll(".snake-body-element");

var gameArea = document.querySelector(".play-area");

//var movementDirection = "right";

var turnVar = 0;

var movementInterval;


// give the percentage width of an element in pixel
function percentWidthToPixel(_elem, _perc){
    return (_elem.offsetWidth/100)* parseFloat(_perc);
}
// give the percentage heigth of an element in pixel
function percentHeightToPixel(_elem, _perc){
    return (_elem.offsetHeight/100)* parseFloat(_perc);
}

// rotate an element
function rotateElement (element, degree) {
    gsap.to(element, {
        rotate: degree,
        duration: 0
    })
}



function moveSnakeForward() {
    for (let i = 0; i < allSnakeBodyElements.length; i++) {
        switch (allSnakeBodyElements[i].getAttribute("data-direction")) {
            case "left":
                gsap.to(allSnakeBodyElements[i], {
                    y: "+=20"
                });
                break;
            case "right":
                gsap.to(allSnakeBodyElements[i], {
                    y: "-=20"
                });
                break;
            case "up":
                gsap.to(allSnakeBodyElements[i], {
                    x: "-=20"
                });
                break;
            case "down":
                gsap.to(allSnakeBodyElements[i], {
                    x: "+=20"
                });
                break;
            default:
                break;
        }
    }
}


function turnSnake (direction) {

    if (turnVar >= allSnakeBodyElements.length) {
        return;
    }

    switch (direction) {
        case "up":
            rotateElement(allSnakeBodyElements[turnVar], 90);
            allSnakeBodyElements[turnVar].setAttribute('data-direction', 'up');
            break;
        case "left":
            rotateElement(allSnakeBodyElements[turnVar], 180);
            allSnakeBodyElements[turnVar].setAttribute('data-direction', 'left');
            break;
        case "down":
            rotateElement(allSnakeBodyElements[turnVar], 90);
            allSnakeBodyElements[turnVar].setAttribute('data-direction', 'down');
            break;
        case "right":
            rotateElement(allSnakeBodyElements[turnVar], 0);
            allSnakeBodyElements[turnVar].setAttribute('data-direction', 'right');
            break;
        default:
            break;
    }

    turnVar++;

}



document.addEventListener('keydown', function(e) {
    if (e.code == "ArrowLeft") {
        console.log("left");
        turnVar = 0;
        clearInterval(movementInterval);
        movementInterval = setInterval(function() {
            turnSnake("left")
            moveSnakeForward();
        }, 500)
    }
    if (e.code == "ArrowRight") {
        console.log("right");
        turnVar = 0;
        clearInterval(movementInterval);
        movementInterval = setInterval(function() {
            turnSnake("right")
            moveSnakeForward();
        }, 500)
    }
    if (e.code == "ArrowUp") {
        console.log("up");
        turnVar = 0;
        clearInterval(movementInterval);
        movementInterval = setInterval(function() {
            turnSnake("up")
            moveSnakeForward();
        }, 500)
    }
    if (e.code == "ArrowDown") {
        console.log("down");
        turnVar = 0;
        clearInterval(movementInterval);
        movementInterval = setInterval(function() {
            turnSnake("down")
            moveSnakeForward();
        }, 500)
    }
});

