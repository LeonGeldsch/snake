var allSnakeBodyElements = Array.from(document.querySelectorAll(".snake-body-element"));

var gameArea = document.querySelector(".game-area");

var startingSnakeElementsInput = document.querySelector(".starting-snake-elements-input");

var movementInterval;

var turnInterval;

var tickSpeed = 0.2;

var startButton = document.querySelector(".start-button");

var snakeFood = document.querySelector(".snake-food");

var score = 0;

var startingSnakeElements = 3;

var mobileButtonUp = document.querySelector("#mobile-up-button");

var mobileButtonDown = document.querySelector("#mobile-down-button");

var mobileButtonLeft = document.querySelector("#mobile-left-button");

var mobileButtonRight = document.querySelector("#mobile-right-button");

var gameAreaPixelSize = parseFloat(getComputedStyle(allSnakeBodyElements[0]).getPropertyValue('width'));

var gameAreaWidth = parseFloat(getComputedStyle(gameArea).getPropertyValue('width')) / gameAreaPixelSize;

var gameAreaHeight = parseFloat(getComputedStyle(gameArea).getPropertyValue('height')) / gameAreaPixelSize;

var snakeHeadStartingX = gameAreaWidth / 2;

console.log(gameAreaPixelSize, gameAreaWidth, gameAreaHeight);

var snakeHeadStartingY = gameAreaHeight / 2;

var snakeHeadStartingDirection = "right";

var inputArray = [];

var movementEase = document.querySelector(".movement-ease-input").value;

var wallCollisionOn = document.querySelector(".wall-collision-input").checked;
var bodyCollisionOn = document.querySelector(".body-collision-input").checked;
var foodCollisionOn = document.querySelector(".food-collision-input").checked;

var keyDownListener = function(e) {
    if (e.code == "ArrowLeft") {
        console.log("left");
        inputArray.push("left");
        /*
        turnIntervalPaused = true;
        movementIntervalPaused = true;
        setTimeout(function () {
            turnIntervalPaused = false;
            movementIntervalPaused = false;
        }), 1000;
        moveSnakeForward();
        turnSnake("left");
        */
    }
    if (e.code == "ArrowRight") {
        console.log("right");
        inputArray.push("right");
        /*
        turnIntervalPaused = true;
        movementIntervalPaused = true;
        setTimeout(function () {
            turnIntervalPaused = false;
            movementIntervalPaused = false;
        }), 1000;
        moveSnakeForward();
        turnSnake("right");
        */
    }
    if (e.code == "ArrowUp") {
        console.log("up");
        inputArray.push("up");
        /*
        turnIntervalPaused = true;
        movementIntervalPaused = true;
        setTimeout(function () {
            turnIntervalPaused = false;
            movementIntervalPaused = false;
        }), 1000;
        moveSnakeForward();
        turnSnake("up");
        */
    }
    if (e.code == "ArrowDown") {
        console.log("down");
        inputArray.push("down");
        /*
        turnIntervalPaused = true;
        movementIntervalPaused = true;
        setTimeout(function () {
            turnIntervalPaused = false;
            movementIntervalPaused = false;
        }), 1000;
        moveSnakeForward();
        turnSnake("down");
        */
    }
};


/*
 * ---------------------------------------- FUNCTIONS ---------------------------------------
 */


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

// give an element 100% opacity
function fullOpacity (element) {
    gsap.to(element, {
        opacity: 1,
        duration: 1
    });
}


function checkForFoodCollision (snakeHeadX, snakeHeadY) {

    let snakeFoodX = snakeFood.getAttribute("data-x");
    let snakeFoodY = snakeFood.getAttribute("data-y");

    if ((snakeHeadX == snakeFoodX) && (snakeHeadY == snakeFoodY)) {
        score++;
        console.log("YUM! score:", score);
        spawnFood();
        //stopGame();

        /*
        let snakeEndX = allSnakeBodyElements[allSnakeBodyElements.length-1].getBoundingClientRect().left - allSnakeBodyElements[0].parentNode.getBoundingClientRect().left - 5;
        let snakeEndY = allSnakeBodyElements[allSnakeBodyElements.length-1].getBoundingClientRect().top - allSnakeBodyElements[0].parentNode.getBoundingClientRect().top - 5;
        */
        
        let snakeEndX = allSnakeBodyElements[allSnakeBodyElements.length-1].getAttribute("data-x");
        let snakeEndY = allSnakeBodyElements[allSnakeBodyElements.length-1].getAttribute("data-y");

        let snakeEndDirection = allSnakeBodyElements[allSnakeBodyElements.length-1].getAttribute("data-direction");
        let newSnakeElement = document.createElement("div");
        newSnakeElement.classList.add("snake-body-element");
        newSnakeElement.setAttribute('data-direction', snakeEndDirection);
        gameArea.appendChild(newSnakeElement);
        allSnakeBodyElements.push(newSnakeElement);

        switch (snakeEndDirection) {
            case "left":
                gsap.to(newSnakeElement, {
                    x:  snakeEndX * gameAreaPixelSize + gameAreaPixelSize,
                    y:  snakeEndY * gameAreaPixelSize,
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
                    x:  snakeEndX * gameAreaPixelSize - gameAreaPixelSize,
                    y:  snakeEndY * gameAreaPixelSize,
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
                    x:  snakeEndX * gameAreaPixelSize,
                    y:  snakeEndY * gameAreaPixelSize + gameAreaPixelSize,
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
                    x:  snakeEndX * gameAreaPixelSize,
                    y:  snakeEndY * gameAreaPixelSize - gameAreaPixelSize,
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
    console.log(snakeHeadX, snakeHeadY, snakeFoodX, snakeFoodY);
}


function checkForWallCollision(snakeHeadX, snakeHeadY, snakeHeadDirection) {
    if (snakeHeadX >= gameAreaWidth-1 && snakeHeadDirection == "right" || snakeHeadX <= 0 && snakeHeadDirection == "left" || snakeHeadY >= gameAreaHeight-1 && snakeHeadDirection == "down" || snakeHeadY <= 0 && snakeHeadDirection == "up") {
        console.log("wall collision");
        stopGame();
        resetGame();
        return;
    }
}


function checkForSnakeBodyCollision () {
    allPreviousX = [];
    allPreviousY = [];
    for (let i = 1; i < allSnakeBodyElements.length; i++) {
        allPreviousX.push(parseFloat(allSnakeBodyElements[i].getAttribute("data-x")));
        allPreviousY.push(parseFloat(allSnakeBodyElements[i].getAttribute("data-y")));
    }

    for (let i = 0; i < allSnakeBodyElements.length; i++) {
        //console.log(allSnakeBodyElements[0].getAttribute("data-x"), allPreviousX[i], allSnakeBodyElements[0].getAttribute("data-y"), allPreviousY[i]);
        if (allSnakeBodyElements[0].getAttribute("data-x") == allPreviousX[i] && allSnakeBodyElements[0].getAttribute("data-y") == allPreviousY[i]) {
            stopGame();
            resetGame();
            return;
        }
    }
}


function moveSnakeForward() {

    /*
    if (turnIntervalPaused) {
        console.log("interval paused");
        return;
    }
    */

    //for queueing up inputs
    let input = inputArray.shift();
    if (input) {
        turnSnake(input);
    }

    

    let snakeHeadX = allSnakeBodyElements[0].getAttribute("data-x");
    let snakeHeadY = allSnakeBodyElements[0].getAttribute("data-y");

    /*
    let snakeHeadX = allSnakeBodyElements[0].getBoundingClientRect().left - allSnakeBodyElements[0].parentNode.getBoundingClientRect().left - 10;
    let snakeHeadY = allSnakeBodyElements[0].getBoundingClientRect().top - allSnakeBodyElements[0].parentNode.getBoundingClientRect().top - 10;
    */
    let snakeHeadDirection = allSnakeBodyElements[0].getAttribute("data-direction");

    if (wallCollisionOn) checkForWallCollision(snakeHeadX, snakeHeadY, snakeHeadDirection);

    if (foodCollisionOn) checkForFoodCollision(snakeHeadX, snakeHeadY);

    for (let i = 0; i < allSnakeBodyElements.length; i++) {
        switch (allSnakeBodyElements[i].getAttribute("data-direction")) {
            case "left":
                gsap.to(allSnakeBodyElements[i], {
                    x: "-=" + gameAreaPixelSize,
                    ease: movementEase,
                    duration: tickSpeed
                });
                allSnakeBodyElements[i].setAttribute("data-x", parseInt(allSnakeBodyElements[i].getAttribute("data-x")) - 1);
                break;
            case "right":
                gsap.to(allSnakeBodyElements[i], {
                    x: "+=" + gameAreaPixelSize,
                    ease: movementEase,
                    duration: tickSpeed
                });
                allSnakeBodyElements[i].setAttribute("data-x", parseInt(allSnakeBodyElements[i].getAttribute("data-x")) + 1);
                break;
            case "up":
                gsap.to(allSnakeBodyElements[i], {
                    y: "-=" + gameAreaPixelSize,
                    ease: movementEase,
                    duration: tickSpeed
                });
                allSnakeBodyElements[i].setAttribute("data-y", parseInt(allSnakeBodyElements[i].getAttribute("data-y")) - 1);
                break;
            case "down":
                gsap.to(allSnakeBodyElements[i], {
                    y: "+=" + gameAreaPixelSize,
                    ease: movementEase,
                    duration: tickSpeed
                });
                allSnakeBodyElements[i].setAttribute("data-y", parseInt(allSnakeBodyElements[i].getAttribute("data-y")) + 1);
                break;
            default:
                break;
        }
    }
    if (bodyCollisionOn) checkForSnakeBodyCollision();
}


function stopGame () {
    clearInterval(movementInterval);
    clearInterval(turnInterval);
    alert("ded. score: " + score);
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

    /*
    if (turnIntervalPaused) {
        return;
    }
    */

    let turnVar = 2;

    switch (direction) {
        case "up":
            rotateElement(allSnakeBodyElements[0], 0);
            allSnakeBodyElements[0].setAttribute('data-direction', 'up');
            break;
        case "left":
            rotateElement(allSnakeBodyElements[0], 270);
            allSnakeBodyElements[0].setAttribute('data-direction', 'left');
            break;
        case "down":
            rotateElement(allSnakeBodyElements[0], 180);
            allSnakeBodyElements[0].setAttribute('data-direction', 'down');
            break;
        case "right":
            rotateElement(allSnakeBodyElements[0], 90);
            allSnakeBodyElements[0].setAttribute('data-direction', 'right');
            break;
        default:
            break;
    }

    setTimeout(function() {
        if (allSnakeBodyElements[1]) {
            switch (direction) {
                case "up":
                    rotateElement(allSnakeBodyElements[1], 0);
                    allSnakeBodyElements[1].setAttribute('data-direction', 'up');
                    break;
                case "left":
                    rotateElement(allSnakeBodyElements[1], 270);
                    allSnakeBodyElements[1].setAttribute('data-direction', 'left');
                    break;
                case "down":
                    rotateElement(allSnakeBodyElements[1], 180);
                    allSnakeBodyElements[1].setAttribute('data-direction', 'down');
                    break;
                case "right":
                    rotateElement(allSnakeBodyElements[1], 90);
                    allSnakeBodyElements[1].setAttribute('data-direction', 'right');
                    break;
                default:
                    break;
            }        
        }
    }, tickSpeed * 500);

    var turnInterval = setInterval(function() {
        console.log(turnVar);
        if (turnVar >= allSnakeBodyElements.length) {
            console.log("clearing turn interval..");
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


function moveElementToLocation (element, elementNewX, elementNewY, direction, opacity = 1, duration = 0) {
    gsap.to(element, {
        x: elementNewX - gameAreaPixelSize / 2,
        y: elementNewY - gameAreaPixelSize / 2,
        opacity: opacity,
        duration: duration
    });
    element.setAttribute('data-direction', direction);
    element.setAttribute('data-x', Math.floor(elementNewX / gameAreaPixelSize));
    element.setAttribute('data-y', Math.floor(elementNewY / gameAreaPixelSize));
    switch (direction) {
        case "up":
            rotateElement(element, 0);
            break;
        case "down":
            rotateElement(element, 180);
            break;
        case "left":
            rotateElement(element, 270);
            break;
        case "right":
            rotateElement(element, 90);
            break;
        default:
            break;
    }
}


function createNewSnakeBodyElement () {
    let newSnakeElement = document.createElement("div");
    gameArea.appendChild(newSnakeElement);
    newSnakeElement.classList.add("snake-body-element");
    allSnakeBodyElements.push(newSnakeElement);  

    return newSnakeElement;
    /*
    moveElementToLocation(allSnakeBodyElements[i], elementX * gameAreaPixelSize - i * gameAreaPixelSize, elementY * gameAreaPixelSize);
    rotateElement(allSnakeBodyElements[i], 90);
    
    for (let i = 0; i < allSnakeBodyElements.length; i++) {
        gsap.to(allSnakeBodyElements[i], {
            x: elementX * gameAreaPixelSize - i * gameAreaPixelSize,
            y: elementY * gameAreaPixelSize,
            opacity: 1,
            duration: 0
        })
    }
    */    
}


function startGame () {

    startingSnakeElements = startingSnakeElementsInput.value;
    tickSpeed = document.querySelector(".tick-speed-input").value;
    movementEase = document.querySelector(".movement-ease-input").value;
    wallCollisionOn = document.querySelector(".wall-collision-input").checked;
    bodyCollisionOn = document.querySelector(".body-collision-input").checked;
    foodCollisionOn = document.querySelector(".food-collision-input").checked;

    /*
    allSnakeBodyElements[0].setAttribute('data-x', snakeHeadStartingX);
    allSnakeBodyElements[0].setAttribute('data-y', snakeHeadStartingY);
    allSnakeBodyElements[0].setAttribute('data-direction', snakeHeadStartingDirection);
    */

    moveElementToLocation(allSnakeBodyElements[0], snakeHeadStartingX * gameAreaPixelSize, snakeHeadStartingY * gameAreaPixelSize, snakeHeadStartingDirection);

    for (let i = 0; i < startingSnakeElements; i++) {
        /*
        let newSnakeElement = document.createElement("div");
        gameArea.appendChild(newSnakeElement);
        newSnakeElement.classList.add("snake-body-element");
        allSnakeBodyElements.push(newSnakeElement);    
        newSnakeElement.setAttribute('data-direction', snakeHeadStartingDirection);
        */
        switch (snakeHeadStartingDirection) {
            case "right":
                let newSnakeElement = createNewSnakeBodyElement();
                moveElementToLocation(newSnakeElement, (snakeHeadStartingX - i - 1) * gameAreaPixelSize, (snakeHeadStartingY) * gameAreaPixelSize, snakeHeadStartingDirection);

                /*
                createNewSnakeBodyElement(snakeHeadStartingX - i + 1, snakeHeadStartingY, "right");
                */
                break;
            case "up":
                createNewSnakeBodyElement(snakeHeadStartingX, snakeHeadStartingY + i -1, "up");
                break;
            case "down":
                createNewSnakeBodyElement(snakeHeadStartingX, snakeHeadStartingY - i + 1, "down");
                break;
            case "left":
                createNewSnakeBodyElement(snakeHeadStartingX + i - 1, snakeHeadStartingY, "left");
                break;
            default:
                break;
        }

        /*
        let newSnakeElementPosition = Math.floor(25 / 2 + startingSnakeElements - i + 1);
        newSnakeElement.setAttribute('data-direction', snakeHeadStartingDirection);
        newSnakeElement.setAttribute('data-x', newSnakeElementPosition);
        newSnakeElement.setAttribute('data-y', '12');
        */
    }

    /*
    for (let i = 0; i < allSnakeBodyElements.length; i++) {
        gsap.to(allSnakeBodyElements[i], {
            x: 250 + (startingSnakeElements * 20 / 2) - i * 20,
            y: 240,
            opacity: 1,
            duration: 0
        })
    }
    */

    startButton.removeEventListener('click', startGame);
    console.log("starting game.. tick speed:", tickSpeed, "; movement ease:", movementEase);
    movementInterval = setInterval(moveSnakeForward, tickSpeed * 1000);
    document.addEventListener('keydown', keyDownListener);
    spawnFood();
}



function spawnFood () {
    let snakeFoodX = Math.floor(Math.random() * gameAreaWidth) * gameAreaPixelSize;
    let snakeFoodY = Math.floor(Math.random() * gameAreaHeight) * gameAreaPixelSize;

    snakeFood.setAttribute('data-x', snakeFoodX / gameAreaPixelSize);
    snakeFood.setAttribute('data-y', snakeFoodY / gameAreaPixelSize);

    for (let i = 0; i < allSnakeBodyElements.length; i++) {
        if (snakeFoodX / gameAreaPixelSize == allSnakeBodyElements[i].getAttribute("data-x") && snakeFoodY / gameAreaPixelSize == allSnakeBodyElements[i].getAttribute("data-y")) {
            spawnFood();
        }        
    }

    gsap.to(snakeFood, {
        x: snakeFoodX,
        y: snakeFoodY,
        opacity: 1,
        duration: 0
    })
}


/*
 * ---------------------------- EVENT LISTENERS -----------------------------------
 */


startButton.addEventListener('click', startGame);

mobileButtonUp.addEventListener('click', function() {
    //turnSnake("up");
    inputArray.push("up");
});
mobileButtonDown.addEventListener('click', function() {
    //turnSnake("down");
    inputArray.push("down");
});
mobileButtonLeft.addEventListener('click', function() {
    //turnSnake("left");
    inputArray.push("left");
});
mobileButtonRight.addEventListener('click', function() {
    //turnSnake("right");
    inputArray.push("right");
});

window.addEventListener('resize', function () {
    gameAreaPixelSize = parseInt(getComputedStyle(allSnakeBodyElements[0]).getPropertyValue('width'));
    gameAreaWidth = parseInt(getComputedStyle(gameArea).getPropertyValue('width')) / gameAreaPixelSize;
    gameAreaHeight = parseInt(getComputedStyle(gameArea).getPropertyValue('height')) / gameAreaPixelSize;
    snakeHeadStartingX = gameAreaWidth / 2;
    snakeHeadStartingY = gameAreaHeight / 2;
});

startingSnakeElementsInput.addEventListener('click', function() {
    console.log("test123");
})


