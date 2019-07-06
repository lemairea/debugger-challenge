// remove random execution since functions have side effects
jasmine.getEnv().configure({
  random: false
});


describe("getRandomColor", function() {

  it("should be a css hexadecimal color string", function() {
    expect(getRandomColor()).toMatch(/^#[0-9A-F]{6}$/);
  });

});

// init global variables before test
function init() {
  currentRectangle = null;
  startX = null;
  startY = null;
}

// cleanup potential rectangles after test
function cleanup() {
  var rectangles = document.body.getElementsByClassName('rectangle');
  while (rectangles.length > 0) {
    document.body.removeChild(rectangles[0]);      
  }
}


describe("startDrawRectangle", function() {

  beforeEach(init);
  afterEach(cleanup);

  it("should create a rectangle with the correct style properties", function() {
    startDrawRectangle(100, 200);

    var rectangles = document.body.getElementsByClassName('rectangle');
    expect(rectangles.length).toBe(1);

    var rectangle = rectangles[0];
    expect(rectangle.style.left).toBe('100px');
    expect(rectangle.style.top).toBe('200px');
    expect(rectangle.style.width).toBe('0px');
    expect(rectangle.style.height).toBe('0px');
  });

  it("should create new rectangles at the end of the body", function() {
    startDrawRectangle(100, 200);
    startDrawRectangle(300, 150);

    var rectangles = document.body.getElementsByClassName('rectangle');
    expect(rectangles.length).toBe(2);

    var rectangle = rectangles[1];
    expect(rectangle.style.left).toBe('300px');
    expect(rectangle.style.top).toBe('150px');
  });
});


describe("updateDrawRectangle", function() {

  beforeEach(init);
  afterEach(cleanup);

  it("should update the current rectangle width and height when moving right and bottom", function() {
    startDrawRectangle(100, 200);
    updateDrawRectangle(200, 250);

    var rectangles = document.body.getElementsByClassName('rectangle');
    expect(rectangles.length).toBe(1);

    var rectangle = rectangles[0];
    expect(rectangle.style.left).toBe('100px');
    expect(rectangle.style.top).toBe('200px');
    expect(rectangle.style.width).toBe('100px');
    expect(rectangle.style.height).toBe('50px');
  });

  it("should update the current rectangle top and left positions as well when moving top and left", function() {
    startDrawRectangle(100, 200);
    updateDrawRectangle(50, 100);

    var rectangles = document.body.getElementsByClassName('rectangle');
    expect(rectangles.length).toBe(1);

    var rectangle = rectangles[0];
    expect(rectangle.style.left).toBe('50px');
    expect(rectangle.style.top).toBe('100px');
    expect(rectangle.style.width).toBe('50px');
    expect(rectangle.style.height).toBe('100px');
  });

  it("should update the last rectangle in the body", function() {
    startDrawRectangle(100, 200);
    startDrawRectangle(200, 300);
    updateDrawRectangle(300, 350);

    var rectangles = document.body.getElementsByClassName('rectangle');
    expect(rectangles.length).toBe(2);

    var rectangle = rectangles[1];
    expect(rectangle.style.left).toBe('200px');
    expect(rectangle.style.top).toBe('300px');
    expect(rectangle.style.width).toBe('100px');
    expect(rectangle.style.height).toBe('50px');
  });
});

describe("finishDrawRectangle", function() {

  beforeEach(init);
  afterEach(cleanup);

  it("should reset global variables back to null", function() {
    startDrawRectangle(100, 200);
    updateDrawRectangle(200, 250);
    finishDrawRectangle();

    expect(currentRectangle).toBeNull();
    expect(startX).toBeNull();
    expect(startY).toBeNull();
  });

});
