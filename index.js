var imageContainer = document.getElementById('image-container');
var output = document.getElementById('output');
var intervalId;
var count = 20;
var dragging = false;
var dragStartPoint;
var dragStartCount;

window.onload = function() {
  imageContainer.addEventListener('mousedown',  mousedown,  false);
  imageContainer.addEventListener('mouseup',    mouseup,    false);
  imageContainer.addEventListener('mousemove',  mousemove,  false);
  imageContainer.addEventListener('touchstart', touchstart, false);
  imageContainer.addEventListener('touchmove',  touchmove,  false);
  imageContainer.addEventListener('touchend',   touchend,   false);

  stop();
}

function mousedown(e)  { e.preventDefault(); start(e.clientX, e.clientY); }
function mousemove(e)  { e.preventDefault(); move(e.clientX, e.clientY); }
function mouseup(e)    { e.preventDefault(); stop(); }
function touchstart(e) { e.preventDefault(); var touch = e.targetTouches[0]; start(touch.pageX, touch.pageY); }
function touchmove(e)  { e.preventDefault(); var touch = e.targetTouches[0]; move(touch.pageX, touch.pageY); }
function touchend(e)   { e.preventDefault(); stop(); }

function start(x, y) {
  dragging = true;
  dragStartPoint = [x, y];
  dragStartCount = count;

  if (intervalId) {
    window.clearInterval(intervalId);
  }
}

function move(x, y) {
  if (dragging) {
    var dx = x - dragStartPoint[0];
    var dy = y - dragStartPoint[1];
    var dc = Math.floor(-dx / 10);
    var c = dragStartCount + dc;
    count = Math.max(0, Math.min(20, c));
    show(count);
  }
}

function stop() {
  dragging = false;

  show(count);
  intervalId = window.setInterval(function () {
    count = Math.max(0, count - 1);
    show(count);
    if (count === 0) {
      window.clearInterval(intervalId);
    }
  }, 500);
}

function show(count) {
  //image.src = "images/apple" + (count < 10 ? "0" : "") + count + ".jpg";
  var nodes = imageContainer.childNodes;
  var index = 0;
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    if (node.nodeName === "IMG") {
      node.style.display = (count === index ? "inline" : "none");
      index += 1;
    }
  }
}

function log(message) {
  console.log(message);
  output.innerHTML = '<li>' + message + '</li>' + output.innerHTML;
}
