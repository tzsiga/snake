var body = document.querySelector('body');
var inc = 10;
var unit = 'px';
var step = 100;		// ms

var Direction = {};
Direction.left = 37;
Direction.right = 39;
Direction.top = 38;
Direction.bottom = 40;

var GT = {};
GT.width = 40;
GT.height = 30;

GT.createElement = function () {
  var element = document.createElement('div');
  element.style.display = 'inline-block';
  element.style.position = 'relative';
  element.style.width = (GT.width * inc) + unit;
  element.style.height = (GT.height * inc) + unit;
  element.style.margin = '15px';
  element.style.outline = '1px solid black';
  return element;
};

GT.element = GT.createElement();
body.appendChild(GT.element);

var Snake = {};
Snake.pos = {};
Snake.direction = Direction.right;

Snake.createPart = function (top, left) {
  var element = document.createElement('div');
  element.style.position = 'absolute';
	element.style.height = inc + unit;
	element.style.width = inc + unit;
	element.style.top = top;
	element.style.left = left;
	element.style.backgroundColor = 'darkgreen';
	return element;
};

Snake.elements = [
  Snake.createPart('0', '0'),
  Snake.createPart(1 * inc + unit, '0'),
  Snake.createPart(2 * inc + unit, '0'),
  Snake.createPart(3 * inc + unit, '0'),
  Snake.createPart(4 * inc + unit, '0'),
  Snake.createPart(5 * inc + unit, '0')
];

Snake.elements.forEach(function(part) {
  GT.element.appendChild(part);
});

Snake.update = function () {
  // copy others
	for (var i = Snake.elements.length - 1; i > 0; --i) {
    Snake.elements[i].style.left = Snake.elements[i - 1].style.left;
    Snake.elements[i].style.top = Snake.elements[i - 1].style.top;
  }

  // update snake head
  Snake.updateElement(Snake.elements[0]);
};

Snake.updateElement = function (element) {
  var left = parseInt(element.style.left);
  var top = parseInt(element.style.top);
  var newPos = 0;

  if (Snake.direction === Direction.left) {
    newPos = left - inc;
    if (newPos < 0) {
      element.style.left = ((GT.width - 1) * inc) + unit;
    } else {
      element.style.left = newPos + unit;
    }
  } else if (Snake.direction === Direction.right) {
    newPos = left + inc;
    if (newPos > (GT.width - 1) * inc) {
      element.style.left = 0;
    } else {
	    element.style.left = newPos + unit;
    }
  } else if (Snake.direction === Direction.top) {
    newPos = top - inc;
    if (newPos < 0) {
      element.style.top = ((GT.height - 1) * inc) + unit;
    } else {
      element.style.top = newPos + unit;
    }
  } else if (Snake.direction === Direction.bottom) {
    newPos = top + inc;
    if (newPos > (GT.height - 1) * inc) {
      element.style.top = 0;
    } else {
      element.style.top = newPos + unit;
    }
  }
}

GT.updateState = function () {
	Snake.update();
}

// key handler
document.onkeydown = function (event) {
  if (event.keyCode >= 37 && event.keyCode <= 40) {
    Snake.direction = event.keyCode;
  }
}

// timer
setInterval(function() {
  GT.updateState();
}, step);
