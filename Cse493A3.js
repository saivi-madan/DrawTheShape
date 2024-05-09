// This is a basic web serial template for p5.js using the Makeability Lab
// serial.js library:
// https://github.com/makeabilitylab/p5js/blob/master/_libraries/serial.js
//
// See a basic example of how to use the library here:
// https://editor.p5js.org/jonfroehlich/sketches/5Knw4tN1d
//
// For more information, see:
// https://makeabilitylab.github.io/physcomp/communication/p5js-serial
// 
// By Jon E. Froehlich
// @jonfroehlich
// http://makeabilitylab.io/
//


let pHtmlMsg;
let serialOptions = { baudRate: 115200  };
let serial;
let potValue;
let xPos, yPos, xNeg, yNeg;
let currSerialVal = 0;
let xCurrentPos = 0;
let xCircle, yCircle;
const shapeNames = ['kite', 'star', 'triangle', 'trapezoid', 'hexagon' , 'pentagon', 'parallelogram', 'rhombus'];
let currentShape = getRandomShape();


function setup() {
  createCanvas(640, 480);

  // Setup Web Serial using serial.js
  serial = new Serial();
  serial.on(SerialEvents.CONNECTION_OPENED, onSerialConnectionOpened);
  serial.on(SerialEvents.CONNECTION_CLOSED, onSerialConnectionClosed);
  serial.on(SerialEvents.DATA_RECEIVED, onSerialDataReceived);
  serial.on(SerialEvents.ERROR_OCCURRED, onSerialErrorOccurred);

  // If we have previously approved ports, attempt to connect with them
  serial.autoConnectAndOpenPreviouslyApprovedPort(serialOptions);

  // Add in a lil <p> element to provide messages. This is optional
  pHtmlMsg = createP("Click anywhere on this page to open the serial connection dialog");
  pHtmlMsg.style('color', 'deeppink');
  
  xCircle = width / 2;
  yCircle = height / 2;
  createCanvas(600, 400);
  background(204);
  colorMode(HSB);
  noStroke();
  currentShape = getRandomShape();
}

// function to get a random shape from the shape array
function getRandomShape() {
  const randomIndex = Math.floor(Math.random() * shapeNames.length);
  return shapeNames[randomIndex];
}


// function to display the random shape on the screen
function displayShapeInstructions() {
  fill(0);
  textSize(24);
  textAlign(LEFT, TOP);
  text(`Draw a ${currentShape}`, 10, 10);
}

function draw() {
    
  let hue = map (xCircle, 0, width, 0, 360);
  noStroke();
  fill(hue, 70, 80, 0.8);
  let maxDiameter = 200;
  let circleDiameter = potValue * 200;
  circle(xCircle, yCircle, circleDiameter);
  displayShapeInstructions();
  
}

function keyPressed() {
  if(key == ' ') {
    background(204);
    currentShape = getRandomShape();
  }
}

/**
 * Callback function by serial.js when there is an error on web serial
 * 
 * @param {} eventSender 
 */
 function onSerialErrorOccurred(eventSender, error) {
  console.log("onSerialErrorOccurred", error);
  pHtmlMsg.html(error);
}

/**
 * Callback function by serial.js when web serial connection is opened
 * 
 * @param {} eventSender 
 */
function onSerialConnectionOpened(eventSender) {
  console.log("onSerialConnectionOpened");
  pHtmlMsg.html("Serial connection opened successfully");
}

/**
 * Callback function by serial.js when web serial connection is closed
 * 
 * @param {} eventSender 
 */
function onSerialConnectionClosed(eventSender) {
  console.log("onSerialConnectionClosed");
  pHtmlMsg.html("onSerialConnectionClosed");
}

/**
 * Callback function serial.js when new web serial data is received
 * 
 * @param {*} eventSender 
 * @param {String} newData new data received over serial
 */
function onSerialDataReceived(eventSender, newData) {
  pHtmlMsg.html("onSerialDataReceived: " + newData);
  const values = newData.split(",");
  
  // parse the button values to move the circle.
  xPos = parseFloat(values[0]);
  yPos = parseFloat(values[1]);
  yNeg = parseFloat(values[2]);
  xNeg = parseFloat(values[3]);
  potValue = parseFloat(values[4]);
  if(xNeg == 1) {
    xCircle -= map(5, 0, 1023, -5, 5);
  }
  if(yNeg == 1) {
    yCircle -= map(5, 0, 1023, -5, 5);
  }
  if(xPos == 1) {
    xCircle += map(5, 0, 1023, -5, 5);
  }
  if(yPos == 1) {
    yCircle += map(5, 0, 1023, -5, 5);
  }
  

  // Constrain circle position within canvas boundaries
  xCircle = constrain(xCircle, 0, width);
  yCircle = constrain(yCircle, 0, height);
}


/**
 * Called automatically by the browser through p5.js when mouse clicked
 */
function mouseClicked() {
  if (!serial.isOpen()) {
    serial.connectAndOpen(null, serialOptions);
  }
}