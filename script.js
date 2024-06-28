//variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('./assets/snake-food.mp3');
const gameOverSound = new Audio('./assets/game-over.mp3');
const gameBackgroundMusic = new Audio('./assets/bg-snake-music.mp3');
const highSpeed = document.getElementById("highSpeed");
const lowSpeed = document.getElementById("lowSpeed");
const playGameButton = document.getElementsByClassName('play')[0];
const pauseGameButton = document.getElementsByClassName('pause')[0];


let isGamePaused = false;
let speed = 5;
let score = 0;
let lastPaintTime = 0;
snakeArr = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 7 };

document.getElementById('snake-speed').textContent = speed;


//For high speed
highSpeed.addEventListener("click", () => {
    if (speed === 10) return;
    speed++;
    document.getElementById('snake-speed').textContent = speed;

});
lowSpeed.addEventListener("click", () => {
    if (speed === 1) return;
    speed--;
    document.getElementById('snake-speed').textContent = speed;
});

// To pause play game
pauseGameButton.addEventListener("click", () => {
    isGamePaused = !isGamePaused;
    pauseGameButton.classList.add("hide");
    playGameButton.classList.remove("hide");
});
playGameButton.addEventListener("click", () => {
    isGamePaused = !isGamePaused;

    playGameButton.classList.add("hide");
    pauseGameButton.classList.remove("hide");
});



//function
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }

    lastPaintTime = ctime;

    // check if game is paused or not if game is not paused then run game engine else game should be stopped
    if (!isGamePaused) {
        gameEngine();
    }
}

function isCollide(snake) {
    //if you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    //if you bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
}

function gameEngine() {
    //updating the snake array and food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        gameBackgroundMusic.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over . press any Key To Play Again !");
        snakeArr = [{ x: 13, y: 15 }]
        gameBackgroundMusic.play();
        score = 0;
    }
    //if snake have eaten the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        console.log(snakeArr[0]);
        console.log(food)
        foodSound.playbackRate = 2;
        foodSound.play();
        score += 1;
        if (score > hiscore) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
            hiscoreBox.innerHTML = "Hiscore:" + hiscoreval;
        }
        scoreBox.innerHTML = "Score : " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    //moving snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] }
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //Display the snake 
    container.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        container.appendChild(snakeElement);
    });
    //Display the food 
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    container.appendChild(foodElement);
}
//main logic
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else {
    hiscoreval = JSON.parse(hiscore)
    hiscoreBox.innerHTML = "Hiscore:" + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 0 };//start game
    gameBackgroundMusic.volume = 0.1;
    gameBackgroundMusic.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;

            break;

        default:
            break;
    }

})
