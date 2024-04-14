// public/app.js
let color = { r: 255, g: 255, b: 255 };
let strokeWidth = 4;

const URL_SERVER = "ws://localhost:3001/";
let connection = new WebSocket(URL_SERVER);
connection.onopen = function () {
  console.log("OPEN !");
};

function setup() {
  color.r = random(100, 255);
  color.g = random(100, 255);
  color.b = random(100, 255);
  //
  createCanvas(512, 512);
  background(0);
}

function mouseDragged() {
  stroke(color.r, color.g, color.b);
  strokeWeight(strokeWidth);
  line(mouseX, mouseY, pmouseX, pmouseY);
  sendMouse(mouseX, mouseY, pmouseX, pmouseY);
}

function sendMouse(x, y, pX, pY) {
  const data = {
    type: "mouse",
    x: x,
    y: y,
    px: pX,
    py: pY,
    color: color,
    strokeWidth: strokeWidth,
  };
  connection.send(JSON.stringify(data));
}

function message(msg) {
  if (msg.type == "mouse") {
    stroke(msg.color.r, msg.color.g, msg.color.b);
    strokeWeight(msg.strokeWidth);
    line(msg.x, msg.y, msg.px, msg.py);
  }
}
connection.onmessage = function (evt) {
  let data = JSON.parse(evt.data);
  console.log(data);
  message(data);
};
