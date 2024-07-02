// Variables to track touch position
let startX = 0;
let startY = 0;

// Add event listeners for touch events
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
document.addEventListener('touchend', handleTouchEnd, false);

function handleTouchStart(event) {
    // inputDir = { x: 0, y: 0 };//start game
    if (!isGamePaused) {
        gameBackgroundMusic.play();
    }

    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
}

function handleTouchMove(event) {
    // Prevent scrolling
    event.preventDefault();
}

function handleTouchEnd(event) {
    let endX = event.changedTouches[0].clientX;
    let endY = event.changedTouches[0].clientY;

    // Calculate distance moved
    let deltaX = endX - startX;
    let deltaY = endY - startY;

    // Determine direction
    if (Math.abs(deltaX) > Math.abs(deltaY)) {

        // Horizontal swipe
        if (deltaX > 0) {
            // Right swipe
            if ((inputDir.x !== -1 && inputDir.y !== 0) || isGameStarted()) {

                inputDir.x = 1;
                inputDir.y = 0;
            }

        } else {
            // Left swipe
            if ((inputDir.x !== 1 && inputDir.y !== 0) || isGameStarted()) {

                inputDir.x = -1;
                inputDir.y = 0;
            }

        }
    } else {
        // Vertical swipe
        if (deltaY > 0) {
            // Down swipe
            if ((inputDir.x !== 0 && inputDir.y !== -1 || isGameStarted())) {
                inputDir.x = 0;
                inputDir.y = 1;
            }

        } else {
            // Up swipe
            if ((inputDir.x !== 0 && inputDir.y !== 1) || isGameStarted()) {
                inputDir.x = 0;
                inputDir.y = -1;
            }
        }
    }
}

