var height = 20;
var width = 35;
var speed = 400;
var snake = [];
var snakeLength = 1;
var frog;
var eatenFrog = 0;
var tail=null;
var playing = false;
var direction = "right"; //intial direction
var maxFrog = 10;
var lastDirection;

//create game screen table
for (var i = 1; i < height; i++) {
  var first = document.createElement("tr");
  first.classList.add("cell" + i);
  document.getElementsByClassName("game-window")[0].appendChild(first);
  for (var j = 1; j < width; j++) {
    var sec = document.createElement("th");
    document.getElementsByClassName("cell" + i)[0].appendChild(sec);
    sec.classList.add("a" + i + "-" + j);
  }
}

//intial snake position 1px, center
var snakePosition = [
                       [parseInt(height / 2), parseInt(width / 2)]
                    ];
                    var xPosition = snakePosition[0][1];
                    var yPosition = snakePosition[0][0];


//key press to start
on();
document.body.addEventListener('keypress', off);
document.body.addEventListener('click', off);

//display intro text
function on() {
  document.getElementById("start").style.display = "block";
}

//hide intro text and start game
function off() {
  document.getElementById("start").style.display = "none";
  playing = true;
  document.body.removeEventListener('keypress', off);
  document.body.removeEventListener('click', off);
  putFrog();
  move();
  playing = true;
}


function putFrog() {
  frog = "a" + addFrog()[0] + "-" + addFrog()[1];
  document.getElementsByClassName(frog)[0].classList.add("frog");
}


//lose screen
function lose() {
  document.getElementById("lose").style.display = "block";
}

//win screen
function win() {
  document.getElementById("win").style.display = "block";
}

//direction change
document.onkeydown = checkKey;
function checkKey(e) {
  e = e || window.event;
  // up arrow
  if (e.keyCode == '38') {
    if (direction != "up" && direction != "down") {
      lastDirection = direction;
      direction = "up";
    }
    // down arrow
  } else if (e.keyCode == '40') {
    if (direction != "up" && direction != "down") {
      lastDirection = direction;
      direction = "down";
    }
  // left arrow
  } else if (e.keyCode == '37') {
    if (direction != "left" && direction != "right") {
      lastDirection = direction;
      direction = "left";
    }
  }
  // right arrow
  else if (e.keyCode == '39') {
    if (direction != "left" && direction != "right") {
      lastDirection = direction;
      direction = "right";
    }
  }
}






function move() {

head(xPosition, yPosition);
// body(xPosition, yPosition);


  if (direction == "up") {
    yPosition--;
  } else if (direction == "down") {
    yPosition++;
  } else if (direction == "left") {
    xPosition--;
  } else if (direction == "right") {
    xPosition++;
  }

  if (playing) {
    setTimeout(move, speed);
  }
}

function checkBorder(x, y) {
  if (x == 0 || x >= width || y == 0 || y >= height || eatenFrog>=maxFrog) {
    return false;
  } else return true;

}


function body() {

  for (var i = 0; i < snakeLength; i++) {
    x = snakePosition[i][1];
    y = snakePosition[i][0];
    var name = "a" + y + "-" + x;
    document.getElementsByClassName(name)[0].classList.add("body");
  }

}

function head(x, y) {

  if (checkBorder(x, y)) {
    goSnake(x, y);
  } else {
    playing = false;
    if (eatenFrog < maxFrog) {
      lose();
    } else {
      document.getElementsByClassName(frog)[0].classList.remove("frog");
      win();
    }
  }
}

function goSnake(x, y) {
  beep();
  if (snakePosition.length > 1) {
    body();
  }
  var name = "a" + y + "-" + x;
  document.getElementsByClassName(name)[0].classList.add("head"+"_"+direction);
  if (tail != null) {
    document.getElementsByClassName(tail)[0].classList.remove("head"+"_"+direction);
      document.getElementsByClassName(tail)[0].classList.remove("head"+"_"+lastDirection);
  }
  snakePosition.splice(0, 0, [y, x]);
  tail = name;
  if (frog == name) {

    document.getElementsByClassName(frog)[0].classList.remove("frog");
    beep();
    eatenFrog++;
    snakeLength++;
    speed = parseInt(speed / 1.1);
    putFrog();
  } else {
    var tail1 = snakePosition.splice(-1, 1);

    var y = tail1[0][0];
    var x = tail1[0][1];
    var name = "a" + y + "-" + x;
    document.getElementsByClassName(name)[0].classList.remove("body");
  }



}

function beep() {
  var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
  snd.play();
}

function addFrog() {
  xFrog = Math.floor((Math.random() * (height - 1) + 1));
  yFrog = Math.floor((Math.random() * (width - 1) + 1));
  return [xFrog, yFrog];
}
