// global variables, not perfect design -> should be addressed if complexity grows
currentRectangle = null;
startX = null;
startY = null;


/**
 * Generates a random css hexadecimal color.
 */
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * Start drawing a rectangle with a random color at the given coordinates.
 * 
 * @param {int} x the horizontal position of the rectangle in pixels.
 * @param {int} y the vertical position of the rectangle in pixels.
 */
function startDrawRectangle(x, y) {
    // store start x and y position for later use
    startX = x;
    startY = y;

    // create new rectangle element in dom
    currentRectangle = document.createElement('div');
    currentRectangle.classList.add('rectangle');
    currentRectangle.style.top = y + 'px';
    currentRectangle.style.left = x + 'px';
    currentRectangle.style.width = 0;
    currentRectangle.style.height = 0;
    currentRectangle.style.backgroundColor = getRandomColor();
    document.body.appendChild(currentRectangle);
}
 
/**
 * Update the current rectangle with the given coordinates.
 * 
 * @param {int} x the horizontal position of the rectangle in pixels.
 * @param {int} y the vertical position of the rectangle in pixels.
 */
function updateDrawRectangle(x, y) {
    if (currentRectangle !== null) {
        currentRectangle.style.width = Math.abs(x - startX) + 'px';
        currentRectangle.style.height = Math.abs(y - startY) + 'px';    

        // if to the left, move left position of rectangle
        if (x < startX) { 
            currentRectangle.style.left = x + 'px';
        }

        // if to the top, move top position of rectangle
        if (y < startY) { 
            currentRectangle.style.top = y + 'px';
        }
    }
}

/**
 * Finish drawing the current rectangle.
 */
function finishDrawRectangle() {
    currentRectangle = null; 
    startX = null;
    startY = null;
}
