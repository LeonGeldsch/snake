var snake = document.querySelector(".snake");

var allSnakeBodyElements = Array.from(document.querySelectorAll(".snake-body-element"));

var gameArea = document.querySelector(".game-area");

var startingSnakeElementsInput = document.querySelector(".starting-snake-elements-input");

var movementInterval;

var turnInterval;

var tickSpeed = 0.25;

var startButton = document.querySelector(".start-button");

var snakeFood = document.querySelector(".snake-food");

var snakeFoodX;

var snakeFoodY;

var score = 0;

var startingSnakeElements = 3;

var allPreviousX = [];

var allPreviousY = [];

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

function fullOpacity (element) {
    gsap.to(element, {
        opacity: 1,
        duration: 0
    });
}



function moveSnakeForward() {



    let snakeHeadX = allSnakeBodyElements[0].getBoundingClientRect().left - allSnakeBodyElements[0].parentNode.getBoundingClientRect().left - 10;
    let snakeHeadY = allSnakeBodyElements[0].getBoundingClientRect().top - allSnakeBodyElements[0].parentNode.getBoundingClientRect().top - 10;
    let snakeHeadDirection = allSnakeBodyElements[0].getAttribute("data-direction");

    console.log(snakeHeadX, snakeHeadY, snakeFoodX, snakeFoodY);

    
    if (snakeHeadX >= 475 && snakeHeadDirection == "right" || snakeHeadX <= 0 && snakeHeadDirection == "left" || snakeHeadY >= 475 && snakeHeadDirection == "down" || snakeHeadY <= 0 && snakeHeadDirection == "up") {
        stopGame();
        resetGame();
        return;
    }

    

    if ((snakeHeadX + 5 == snakeFoodX) && (snakeHeadY + 5 == snakeFoodY)) {
        score++;
        console.log("YUM! score:", score);
        spawnFood();
        //stopGame();

        let snakeEndX = allSnakeBodyElements[allSnakeBodyElements.length-1].getBoundingClientRect().left - allSnakeBodyElements[0].parentNode.getBoundingClientRect().left - 5;
        let snakeEndY = allSnakeBodyElements[allSnakeBodyElements.length-1].getBoundingClientRect().top - allSnakeBodyElements[0].parentNode.getBoundingClientRect().top - 5;
        let snakeEndDirection = allSnakeBodyElements[allSnakeBodyElements.length-1].getAttribute("data-direction");
        let newSnakeElement = document.createElement("div");
        newSnakeElement.classList.add("snake-body-element");
        newSnakeElement.setAttribute('data-direction', snakeEndDirection);
        gameArea.appendChild(newSnakeElement);
        allSnakeBodyElements.push(newSnakeElement);

        //newSnakeElementX = newSnakeElement.getBoundingClientRect().left;
        //newSnakeElementY = newSnakeElement.getBoundingClientRect().top;

        
        

        switch (snakeEndDirection) {
            case "left":
                gsap.to(newSnakeElement, {
                    x:  snakeEndX + 20,
                    y:  snakeEndY,
                    duration: 0
                })
                setTimeout(function () {
                    fullOpacity(newSnakeElement);
                }, tickSpeed * 1000);
                newSnakeElement.setAttribute('data-x', parseInt( allSnakeBodyElements[allSnakeBodyElements.length-2].getAttribute("data-x")) + 1 );
                newSnakeElement.setAttribute('data-y', parseInt( allSnakeBodyElements[allSnakeBodyElements.length-2].getAttribute("data-y")) );
                break;
            case "right":
                gsap.to(newSnakeElement, {
                    x:  snakeEndX - 20,
                    y:  snakeEndY,
                    duration: 0
                })
                setTimeout(function () {
                    fullOpacity(newSnakeElement);
                }, tickSpeed * 1000);
                newSnakeElement.setAttribute('data-x', parseInt( allSnakeBodyElements[allSnakeBodyElements.length-2].getAttribute("data-x")) - 1 );
                newSnakeElement.setAttribute('data-y', parseInt( allSnakeBodyElements[allSnakeBodyElements.length-2].getAttribute("data-y")) );
                break;
            case "up":
                gsap.to(newSnakeElement, {
                    x:  snakeEndX,
                    y:  snakeEndY + 20,
                    duration: 0
                })
                setTimeout(function () {
                    fullOpacity(newSnakeElement);
                }, tickSpeed * 1000);
                newSnakeElement.setAttribute('data-x', parseInt( allSnakeBodyElements[allSnakeBodyElements.length-2].getAttribute("data-x")) );
                newSnakeElement.setAttribute('data-y', parseInt( allSnakeBodyElements[allSnakeBodyElements.length-2].getAttribute("data-y")) + 1 );
                break;
            case "down":
                gsap.to(newSnakeElement, {
                    x:  snakeEndX,
                    y:  snakeEndY - 20,
                    duration: 0
                })
                setTimeout(function () {
                    fullOpacity(newSnakeElement);
                }, tickSpeed * 1000);
                newSnakeElement.setAttribute('data-x', parseInt( allSnakeBodyElements[allSnakeBodyElements.length-2].getAttribute("data-x")) );
                newSnakeElement.setAttribute('data-y', parseInt( allSnakeBodyElements[allSnakeBodyElements.length-2].getAttribute("data-y")) - 1 );
                break;
            default:
                break;
        }
    }

    //console.log("test:", parseInt(allSnakeBodyElements[allSnakeBodyElements.length - 1].getAttribute("data-y")) - 1);

    for (let i = 0; i < allSnakeBodyElements.length; i++) {
        switch (allSnakeBodyElements[i].getAttribute("data-direction")) {
            case "left":
                gsap.to(allSnakeBodyElements[i], {
                    x: "-=20",
                    duration: tickSpeed
                });
                allSnakeBodyElements[i].setAttribute("data-x", parseInt(allSnakeBodyElements[i].getAttribute("data-x")) - 1);
                break;
            case "right":
                gsap.to(allSnakeBodyElements[i], {
                    x: "+=20",
                    duration: tickSpeed
                });
                allSnakeBodyElements[i].setAttribute("data-x", parseInt(allSnakeBodyElements[i].getAttribute("data-x")) + 1);
                break;
            case "up":
                gsap.to(allSnakeBodyElements[i], {
                    y: "-=20",
                    duration: tickSpeed
                });
                allSnakeBodyElements[i].setAttribute("data-y", parseInt(allSnakeBodyElements[i].getAttribute("data-y")) - 1);
                break;
            case "down":
                gsap.to(allSnakeBodyElements[i], {
                    y: "+=20",
                    duration: tickSpeed
                });
                allSnakeBodyElements[i].setAttribute("data-y", parseInt(allSnakeBodyElements[i].getAttribute("data-y")) + 1);
                break;
            default:
                break;
        }
    }


    allPreviousX = [];
    allPreviousY = [];
    for (let i = 1; i < allSnakeBodyElements.length; i++) {
        allPreviousX.push(parseInt(allSnakeBodyElements[i].getAttribute("data-x")));
        allPreviousY.push(parseInt(allSnakeBodyElements[i].getAttribute("data-y")));
    }

    for (let i = 0; i < allSnakeBodyElements.length; i++) {
        if (allSnakeBodyElements[0].getAttribute("data-x") == allPreviousX[i] && allSnakeBodyElements[0].getAttribute("data-y") == allPreviousY[i]) {
            stopGame();
            resetGame();
            return;
        }
    }

}


function stopGame () {
    clearInterval(movementInterval);
    clearInterval(turnInterval);
    alert("ded");

}

function resetGame () {
    console.log("resetting game..");
    score = 0;

    for (let i = 1; i < allSnakeBodyElements.length; i++) {
        gameArea.removeChild(allSnakeBodyElements[i]);
    }

    allSnakeBodyElements.splice(1, allSnakeBodyElements.length - 1);

    gsap.to(allSnakeBodyElements[0], {
        x: 0,
        y: 0,
        opacity: 0,
        duration: 0
    });
    allSnakeBodyElements[0].setAttribute('data-direction', 'right');
    allSnakeBodyElements[0].setAttribute('data-x', 0);
    allSnakeBodyElements[0].setAttribute('data-y', 0);
    rotateElement(allSnakeBodyElements[0], 0);

    document.removeEventListener('keydown', keyDownListener);
    startButton.addEventListener('click', startGame);
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
                rotateElement(allSnakeBodyElements[turnVar], 0);
                allSnakeBodyElements[turnVar].setAttribute('data-direction', 'up');
                break;
            case "left":
                rotateElement(allSnakeBodyElements[turnVar], 270);
                allSnakeBodyElements[turnVar].setAttribute('data-direction', 'left');
                break;
            case "down":
                rotateElement(allSnakeBodyElements[turnVar], 180);
                allSnakeBodyElements[turnVar].setAttribute('data-direction', 'down');
                break;
            case "right":
                rotateElement(allSnakeBodyElements[turnVar], 90);
                allSnakeBodyElements[turnVar].setAttribute('data-direction', 'right');
                break;
            default:
                break;
        }
        turnVar++;
    }, tickSpeed * 1000)
}



function startGame () {

    startingSnakeElements = startingSnakeElementsInput.value;


    for (let i = 0; i < startingSnakeElements; i++) {
        let newSnakeElementPosition = Math.floor(25 / 2 + startingSnakeElements - i + 1);
        let newSnakeElement = document.createElement("div");
        newSnakeElement.classList.add("snake-body-element");
        newSnakeElement.setAttribute('data-direction', 'right');
        newSnakeElement.setAttribute('data-x', newSnakeElementPosition);
        newSnakeElement.setAttribute('data-y', '12');
        gameArea.appendChild(newSnakeElement);
        allSnakeBodyElements.push(newSnakeElement);
    }

    allSnakeBodyElements[0].setAttribute('data-x', '14');
    allSnakeBodyElements[0].setAttribute('data-y', '12');


    for (let i = 0; i < allSnakeBodyElements.length; i++) {
        gsap.to(allSnakeBodyElements[i], {
            x: 250 + (startingSnakeElements * 20 / 2) - i * 20,
            y: 240,
            opacity: 1,
            duration: 0
        })
        rotateElement(allSnakeBodyElements[i], 90);
    }


    startButton.removeEventListener('click', startGame);


    tickSpeed = document.querySelector(".tick-speed-input").value;
    console.log("starting game.. tick speed:", tickSpeed);
    movementInterval = setInterval(moveSnakeForward, tickSpeed * 1000);
    document.addEventListener('keydown', keyDownListener);
    spawnFood();
}



function spawnFood () {
    snakeFoodX = Math.floor(Math.random() * 25) * 20;
    snakeFoodY = Math.floor(Math.random() * 25) * 20;

    snakeFood.setAttribute('data-x', snakeFoodX / 20);
    snakeFood.setAttribute('data-y', snakeFoodY / 20);

    gsap.to(snakeFood, {
        x: snakeFoodX,
        y: snakeFoodY,
        opacity: 1,
        duration: 0
    })
}



startButton.addEventListener('click', startGame);
