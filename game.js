let unitLength;
let boxColor = document.querySelector("#boxColor").value;
let boxRadius;
let strokeColor = document.querySelector("#strokeColor").value;
let columns; /* To be determined by window width */
let rows; /* To be determined by window height */
let currentBoard;
let nextBoard;
let backgroundColor;
let rainbow = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
let fr, song;
let emptyCount = false;
let randomize = [
  Math.random() * 255,
  Math.random() * 255,
  Math.random() * 255,
  Math.min(80, Math.random() * 100),
];
let colorCode = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
];
let colorPattern = [
  ["#949398", "#F4DF4E"],
  ["#FC766A", "#5B84B1"],
  ["#5F4B8B", "#E69A8D"],
  ["#42EADD", "#CDB599"],
  ["#000000", "#FFFFFF"],
  ["#00A4CC", "#F95700"],
  ["#00203F", "#ADEFD1"],
  ["#606060", "#D6ED17"],
  ["#ED2B33", "#D85A7F"],
  ["#2C5FCD", "#97BC62"],
  ["#00539C", "#EEA47F"],
  ["#0063B2", "#9CC3D5"],
  ["##D198C5", "#E0C568"],
  ["#CBCE91", "#EA738D"],
  ["#B1624E", "#5CC8D7"],
  ["#89ABE3", "#FCF6F5"],
  ["#E3CD81", "#B1B3B3"],
  ["#A07855", "#D4B996"],
  ["#CBCE91", "#76528B"],
  ["#F93822", "#FDD20E"],
];
let selectedColor;
let comedy;

// function preload() {
//   songFormats('mp3')
//   song = loadSound("./WEF_Proj_Jeffrey_Pang/Comedy.mp3");
// }
function setup() {
  // audioElement.play();
  /* Set the canvas to be under the element #canvas*/
  // song = loadSound("./WEF_Proj_Jeffrey_Pang/Comedy.mp3");
  unitLength = parseInt(document.getElementById("unitControl").value);
  let adjWidth = Math.min(900, windowWidth);
  let adjHeight = Math.min(700, windowHeight);
  let canvas = createCanvas(
    adjWidth - (adjWidth % unitLength),
    adjHeight - (adjHeight % unitLength)
  );
  canvas.parent(document.querySelector("#canvas"));

  /*Calculate the number of columns and rows */
  unitLength = parseInt(document.getElementById("unitControl").value);
  columns = floor(width / unitLength);
  rows = floor(height / unitLength);

  /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
  currentBoard = [];
  nextBoard = [];
  for (let i = 0; i < columns; i++) {
    currentBoard[i] = [];
    nextBoard[i] = [];
  }
  // Now both currentBoard and nextBoard are array of array of undefined values.
  noLoop();
  init(); // Set the initial values of the currentBoard and nextBoard
}

/**
 * // Set the initial values of the currentBoard and nextBoard
 * Initialize/reset the board state
 */
function init(action) {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      if (action) {
        currentBoard[i][j] = random() > 0.8 ? 1 : 0;
      } else {
        currentBoard[i][j] = 0;
      }
      nextBoard[i][j] = 0;
    }
  }
  frameCount = 0;
}

function check() {
  let checkboxes = document.querySelectorAll("input.color-random");
  checkboxes.forEach((checkbox) => {
    checkbox.checked = !checkbox.checked;
  });
}

function checkAll() {
  check();
}

function uncheckAll() {
  check();
}

const btn = document.querySelector("#btnForColor");
btn.onclick = checkAll;

function draw() {
  selectedColor = [document.getElementById("colorID").value - 1];
  // selectedColor = random(colorCode);
  unitLength = parseInt(document.getElementById("unitControl").value);
  fr = document.getElementById("frameRateControl").value;
  frameRate(parseInt(fr));
  document.querySelector("div.round").innerHTML = `FrameCount: ${frameCount}`;
  if (document.querySelector("#bgRandom").checked === true) {
    backgroundColor = [
      Math.random() * 255,
      Math.random() * 255,
      Math.random() * 255,
      Math.random() * 100,
    ];
  } else {
    let colorMode = document.querySelector(
      'input[name="colorMode"]:checked'
    ).value;
    // console.log("colorMode:" + colorMode);
    switch (colorMode) {
      case "bestColor":
        let colorSwitch = document.querySelector(
          'input[name="colorSwitch"]:checked'
        ).value;
        switch (colorSwitch) {
          case "color1":
            backgroundColor = colorPattern[selectedColor][1];
            break;
          case "color2":
            backgroundColor = colorPattern[selectedColor][0];
            break;
          default:
            break;
        }
        break;
      case "customColor":
        // console.log("entering customColor");
        backgroundColor = document.querySelector("#background").value;
        // console.log("check backgroundColor", backgroundColor);
        break;
      default:
        break;
    }
  }
  background(backgroundColor);
  generate();
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      if (currentBoard[i][j] === 1) {
        if (document.querySelector("#boxRandom").checked === true) {
          boxColor = [
            Math.random() * 255,
            Math.random() * 255,
            Math.random() * 255,
            Math.random() * 20 + 80,
          ];
        } else {
          colorMode = document.querySelector(
            'input[name="colorMode"]:checked'
          ).value;
          // console.log("colorMode:" + colorMode);
          switch (colorMode) {
            case "bestColor":
              colorSwitch = document.querySelector(
                'input[name="colorSwitch"]:checked'
              ).value;
              switch (colorSwitch) {
                case "color1":
                  boxColor = colorPattern[selectedColor][0];
                  break;
                case "color2":
                  boxColor = colorPattern[selectedColor][1];
                  break;
                default:
                  break;
              }
              break;
            case "customColor":
              boxColor = document.querySelector("#boxColor").value;
              break;
            default:
              break;
          }
        }
        fill(boxColor);
      } else {
        fill(backgroundColor);
      }
      if (document.querySelector("#strokeRandom").checked === true) {
        strokeColor = [
          Math.random() * 255,
          Math.random() * 255,
          Math.random() * 255,
          Math.random() * 20 + 80,
        ];
      } else {
        strokeColor = document.querySelector("#strokeColor").value;
      }
      // strokeWeight(10);
      fr = document.getElementById("frameRateControl").value;
      frameRate(parseInt(fr));
      stroke(strokeColor);
      boxRadius = parseInt(document.querySelector("#radiusControl").value);
      rect(i * unitLength, j * unitLength, unitLength, unitLength, boxRadius);
      //ellipse(i * unitLength, j * unitLength, unitLength, unitLength);
    }
  }
}

function generate() {
  //Loop over every single box on the board
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      // Count all living members in the Moore neighborhood(8 boxes surrounding)
      let neighbors = 0;
      for (let i of [-1, 0, 1]) {
        // -2,-1,0,1,2
        // -3,-2,-1,0,1,2,3
        for (let j of [-1, 0, 1]) {
          if (i == 0 && j == 0) {
            // the cell itself is not its own neighbor
            continue;
          }
          // The modulo operator is crucial for wrapping on the edge
          neighbors +=
            currentBoard[(x + i + columns) % columns][(y + j + rows) % rows];
        }
      }

      // Rules of Life
      if (
        currentBoard[x][y] === 1 &&
        neighbors < parseInt(document.getElementById("rule1").value)
      ) {
        // Die of Loneliness
        nextBoard[x][y] = 0;
      } else if (
        currentBoard[x][y] === 1 &&
        neighbors > parseInt(document.getElementById("rule2").value)
      ) {
        // Die of Overpopulation
        nextBoard[x][y] = 0;
      } else if (
        currentBoard[x][y] === 0 &&
        neighbors === parseInt(document.getElementById("rule3").value)
      ) {
        // New life due to Reproduction
        nextBoard[x][y] = 1;
      } else {
        // Stasis
        nextBoard[x][y] = currentBoard[x][y];
      }
    }
  }

  // Swap the nextBoard to be the current Board
  [currentBoard, nextBoard] = [nextBoard, currentBoard];
}

function mouseDragged() {
  /**
   * If the mouse coordinate is outside the board
   */
  if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
    return;
  }
  emptyCount = true;
  const x = Math.floor(mouseX / unitLength);
  const y = Math.floor(mouseY / unitLength);
  let drawMode = document.querySelector('input[name="drawMode"]:checked').value;
  switch (drawMode) {
    case "Pen":
      currentBoard[x][y] = 1;
      fill(boxColor);
      break;
    case "Eraser":
      currentBoard[x][y] = 0;
      fill(backgroundColor);
      break;
    default:
      break;
  }
  stroke(strokeColor);
  boxRadius = parseInt(document.querySelector("#radiusControl").value);
  rect(x * unitLength, y * unitLength, unitLength, unitLength, boxRadius);
  //ellipse(i * unitLength, j * unitLength, unitLength, unitLength);
}

/**
 * When mouse is pressed
 */
function mousePressed() {
  if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
    return;
  }
  // if (song.isPlaying()) {
  //   song.stop();
  // } else {
  //   song.play();
  // }
  noLoop();
  mouseDragged();
}

function windowResized() {
  adjWidth = Math.min(900, windowWidth);
  adjHeight = Math.min(700, windowHeight);
  resizeCanvas(
    adjWidth - (adjWidth % unitLength),
    adjHeight - (adjHeight % unitLength)
  );
}
/**
 * When mouse is released
 */
// function mouseReleased() {
//   loop();
// }

document.querySelector("#start-game").addEventListener("click", function () {
  // alert when empty
  if (emptyCount == false) {
    alert("The board is empty!");
    noLoop();
  } else {
    loop();
  }
});

function keyTyped() {
  if (key === "s") {
    if (emptyCount == false) {
      alert("The board is empty!");
      noLoop();
    } else {
      loop();
    }
  } else if (key === "c") {
    noLoop();
  } else {
    return;
  }
}

document.querySelector("#stop-game").addEventListener("click", function () {
  noLoop();
});

document.querySelector("#clean-game").addEventListener("click", function () {
  setup();
  emptyCount = false;
  draw();
  init();
});

document.querySelector("#random-game").addEventListener("click", function () {
  init(true);
  emptyCount = true;
  loop();
});

// Ok Control speed of the Game of Life. (Checkout framerate, you can use slider to control the framerate )
// Allow users to change the rules of survival.
// Allow users to change the rules of reproduction.
// Ok Start/Stop the Game of life
// Ok Multiple colors of life on the same board.
// Darken colors for stable life.
// Ok Random initial states
// Well-known patterns of Game of Life to select from(Examples:Gosper Glider Gun, Glider, Lightweight train).
// Use Keyboard to control the cursor to place the life
// Ok Resize board on windows resize(Check out windowsResized)
// Switching between different styles.

// ok alert when empty
// box color in sync in each round
// defined color style
// window size customize
// black and white vs colored
// rainbow pattern
// change box border
// add round number
// list and allow box pattern (drag)
// simplify UX content
// limit box radius
// neighbor extend to 5x5 or 7x7
// input stroke weight

// make array of [box, bg]
