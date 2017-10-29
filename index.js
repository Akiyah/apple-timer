var image = document.getElementById('image');
var output = document.getElementById('output');
var intervalId;
var count = 0;
var dragging = false;
var dragStartPoint;
var dragStartCount;

window.onload = function() {
  image.addEventListener('mousedown',  mousedown,  false);
  image.addEventListener('mouseup',    mouseup,    false);
  image.addEventListener('mousemove',  mousemove,  false);
  image.addEventListener('touchstart', touchstart, false);
  image.addEventListener('touchmove',  touchmove,  false);
  image.addEventListener('touchend',   touchend,   false);
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
  }, 1000);
}

function show(count) {
  image.src = "images/apple" + (count < 10 ? "0" : "") + count + ".jpg";
}

function log(message) {
  console.log(message);
  output.innerHTML = '<li>' + message + '</li>' + output.innerHTML;
}
