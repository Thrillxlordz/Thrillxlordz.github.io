let canvasX
let canvasY
let lines = []
let numLines = 12
let speed = 15
let mouseBias
// let biasWeight = 3
let maxPoints = 100
let maxWeight = 5
let backgroundColor = 'lightgray'
let ignoreNextClick = false;
let mouseLeft = false;

function setup() {
  canvasX = windowWidth
  canvasY = windowHeight
  myCanvas = createCanvas(canvasX, canvasY)
  myCanvas.parent('canvas')
  background(backgroundColor)
  noFill()
}

function draw() {
  if (mouseX > 0 && mouseX < canvasX && mouseY > 0 && mouseY < canvasY && !mouseLeft) {
    mouseBias = true
  } else {
    mouseBias = false
  }
  background(backgroundColor)
  let x, y, offScreen
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].points.length > maxPoints) {
      lines[i].points.splice(0, 1)
    }
    x = lines[i].points[lines[i].points.length - 1].x
    y = lines[i].points[lines[i].points.length - 1].y
    let randX = random(speed * 2) - speed
    let randY = random(speed * 2) - speed
    if (mouseBias) {
      // let bias = createVector(mouseX - x, mouseY - y)
      // bias.normalize()
      // bias.mult(biasWeight)
      // randX += bias.x
      // randY += bias.y
      for (let j = 0; j < 2; j++) {
        let rx = random(speed * 2) - speed
        let ry = random(speed * 2) - speed
        if (dist(x + rx, y + ry, mouseX, mouseY) < dist(x + randX, y + randY, mouseX, mouseY)) {
          randX = rx
          randY = ry
        }
      }
    }
    x += randX
    y += randY
    offScreen = false
    if (x > canvasX) {
      x -= canvasX
      offScreen = true
    } else if (x < 0) {
      x += canvasX
      offScreen = true
    }
    if (y > canvasY) {
      y -= canvasY
      offScreen = true
    } else if (y < 0) {
      y += canvasY
      offScreen = true
    }

    lines[i].points.push(createVector(x, y))

    stroke(lines[i].color)
    strokeWeight(lines[i].weight)
    beginShape()
    vertex(lines[i].points[0].x, lines[i].points[0].y)
    for (let j = 1; j < lines[i].points.length; j++) {
      if (abs(lines[i].points[j].x - lines[i].points[j - 1].x) > speed) {// + biasWeight) {
        endShape()
        beginShape()
        continue
      }
      if (abs(lines[i].points[j].y - lines[i].points[j - 1].y) > speed) {// + biasWeight) {
        endShape()
        beginShape()
        continue
      }
      vertex(lines[i].points[j].x, lines[i].points[j].y)
    }
    endShape()
    if (mouseBias) {
      stroke('red')
      strokeWeight(maxWeight * 2)
      beginShape(POINTS)
      vertex(lines[i].points[lines[i].points.length - 1].x, lines[i].points[lines[i].points.length - 1].y)
      endShape()
    }
  }
}

function mouseClicked() {
  if (ignoreNextClick) {
    ignoreNextClick = false
    return
  }
  createLine(mouseX, mouseY)
}

function createLine(x, y) {
  lines.push(new line())
  lines[lines.length - 1].points.push(createVector(x, y))
  lines[lines.length - 1].color = color(random(255), random(255), random(255))
  let weight = ceil(random(maxWeight))
  while (weight % 2 == 0) {
    weight = ceil(random(maxWeight))
  }
  lines[lines.length - 1].weight = ceil(random(maxWeight))

    if (lines.length > numLines) {
      lines.splice(0, 1)
    }
}

function clearLines() {
  lines = []
  ignoreNextClick = true
}

class line {
  constructor(points = [], color, weight) {
    this.points = points
    this.color = color
    this.weight = weight
  }
}
