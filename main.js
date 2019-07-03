var _canvas2DContext = null;
function getCanvas2DContext() {
    if (_canvas2DContext === null) {
        _canvas2DContext = document.getElementById("main").getContext("2d");
    }
    return _canvas2DContext;
}  

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

var startX = null,
    startY = null;

function startDrawRectangle(event) {
    var context = getCanvas2DContext();
    context.fillStyle = getRandomColor();
    startX = event.clientX;
    startY = event.clientY;
}

function updateDrawRectangle(event) {
    if (startX !== null) {
        var context = getCanvas2DContext();
        ctx.fillRect(0, 0, 150, 75);

    }
}

function finishDrawRectangle(event) {
    console.log('finish');  
    startX = null;
    startY = null;
}
