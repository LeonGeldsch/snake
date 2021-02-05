var snake = document.querySelector(".snake");

var allSnakeBodyElements = document.querySelectorAll(".snake-body-element");

var gameArea = document.querySelector(".play-area");

var movementInterval;

var turnInterval;

var tickSpeed = 0.25;

var startButton = document.querySelector(".start-button");

var keyDownListener = function(e) {
    if (e.code == "ArrowLeft") {
        console.log("left");
        turnSnake("left");
    }
    if (e.code == "ArrowRight") {
        console.log("right");
        turnSnake("right");
    }
    if (e.code == "ArrowUp") {
        console.log("up");
        turnSnake("up");
    }
    if (e.code == "ArrowDown") {
        console.log("down");
        turnSnake("down");
    }
    if (e.code == "KeyP") {
    }
};


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
    console.log(allSnakeBodyElements[0].getBoundingClientRect().left - allSnakeBodyElements[0].parentNode.parentNode.getBoundingClientRect().left, allSnakeBodyElements[0].getBoundingClientRect().top - allSnakeBodyElements[0].parentNode.parentNode.getBoundingClientRect().top);

    if (allSnakeBodyElements[0].getBoundingClientRect().left - allSnakeBodyElements[0].parentNode.parentNode.getBoundingClientRect().left >= 480 && allSnakeBodyElements[0].getAttribute("data-direction") == "right" || allSnakeBodyElements[0].getBoundingClientRect().left - allSnakeBodyElements[0].parentNode.parentNode.getBoundingClientRect().left <= 20 && allSnakeBodyElements[0].getAttribute("data-direction") == "left" || allSnakeBodyElements[0].getBoundingClientRect().top - allSnakeBodyElements[0].parentNode.parentNode.getBoundingClientRect().top >= 480 && allSnakeBodyElements[0].getAttribute("data-direction") == "down" || allSnakeBodyElements[0].getBoundingClientRect().top - allSnakeBodyElements[0].parentNode.parentNode.getBoundingClientRect().top <= 20 && allSnakeBodyElements[0].getAttribute("data-direction") == "up") {
        stopGame();
        return;
    }

    for (let i = 0; i < allSnakeBodyElements.length; i++) {
        switch (allSnakeBodyElements[i].getAttribute("data-direction")) {
            case "left":
                gsap.to(allSnakeBodyElements[i], {
                    y: "+=20",
                    duration: tickSpeed
                });
                break;
            case "right":
                gsap.to(allSnakeBodyElements[i], {
                    y: "-=20",
                    duration: tickSpeed
                });
                break;
            case "up":
                gsap.to(allSnakeBodyElements[i], {
                    x: "-=20",
                    duration: tickSpeed
                });
                break;
            case "down":
                gsap.to(allSnakeBodyElements[i], {
                    x: "+=20",
                    duration: tickSpeed
                });
                break;
            default:
                break;
        }
    }
}


function stopGame () {
    clearInterval(movementInterval);
    clearInterval(turnInterval);
    setTimeout(resetGame, 1000);
}

function resetGame () {
    console.log("resetting game..");
    allSnakeBodyElements.forEach(element => {
        gsap.to(element, {
            x: 0,
            y: 0,
            duration: 1
        });
        element.setAttribute('data-direction', 'right')
        rotateElement(element, 0);
    });
    document.removeEventListener('keydown', keyDownListener);
}


function turnSnake (direction) {

    let turnVar = 0;

    var turnInterval = setInterval(function() {
        if (turnVar >= allSnakeBodyElements.length) {
            clearInterval(turnInterval);
            return;
        }
    
        switch (direction) {
            case "up":
                rotateElement(allSnakeBodyElements[turnVar], 270);
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
    }, tickSpeed * 1000)
}



function startGame () {
    tickSpeed = document.querySelector(".tick-speed-input").value;
    console.log("starting game.. tick speed:", tickSpeed);
    movementInterval = setInterval(moveSnakeForward, tickSpeed * 1000);
    document.addEventListener('keydown', keyDownListener);
}



function spawnFood () {

}



startButton.addEventListener('click', startGame);

console.log(allSnakeBodyElements[0].getBoundingClientRect().left - allSnakeBodyElements[0].parentNode.parentNode.getBoundingClientRect().left, allSnakeBodyElements[0].getBoundingClientRect().top - allSnakeBodyElements[0].parentNode.parentNode.getBoundingClientRect().top);
