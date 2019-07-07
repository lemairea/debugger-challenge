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
 * Remove the given rectangle.
 * 
 * The rectangle will first rotate and then if no other rectangles
 * are rotating, remove all rectangles marked for removal.
 * 
 * @param {HTMLDivElement} rectangle the rectangle to remove.
 */
function removeRectangle(rectangle) {
    // start rotation
    rectangle.classList.add('rotate');

    // wait for rotation animation to finish
    setTimeout(function() {
        // end rotation and mark for removal
        rectangle.classList.remove('rotate');
        rectangle.classList.add('remove');

        // if no more rotating rectangles, remove all rectangles marked for removal
        var rectanglesInRotation = document.body.getElementsByClassName('rotate');
        var rectanglesToRemove = document.body.getElementsByClassName('remove');
        if (rectanglesInRotation.length === 0) {
            while (rectanglesToRemove.length > 0) {
                document.body.removeChild(rectanglesToRemove[0]);      
            }
        }
    }, 2000);
}

/**
 * Start drawing a rectangle with a random color at the given coordinates.
 * 
 * @param {int} x the horizontal position of the rectangle in pixels.
 * @param {int} y the vertical position of the rectangle in pixels.
 */
function startDrawRectangle(x, y) {
    // create new rectangle element in dom
    var newRectangle = document.createElement('div');
    newRectangle.classList.add('rectangle');
    newRectangle.classList.add('draft');
    newRectangle.style.top = y + 'px';
    newRectangle.style.left = x + 'px';
    newRectangle.style.width = 0;
    newRectangle.style.height = 0;
    newRectangle.style.backgroundColor = getRandomColor();
    newRectangle.ondblclick = function() {
        removeRectangle(newRectangle);
    }
    document.body.appendChild(newRectangle);

    // store start x and y position and new rectangle for later use
    startX = x;
    startY = y;
    currentRectangle = newRectangle;
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
    currentRectangle.classList.remove('draft');
    
    currentRectangle = null; 
    startX = null;
    startY = null;
}
