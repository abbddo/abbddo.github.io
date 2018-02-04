let log = [];
let center, pivot, radius, armLength;
function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    center = createVector(width * 0.25, height * 0.5);
    pivot = createVector(width * 0.6, height * 0.5);
    armLength = width * 0.49;
    radius = min(height * 0.2, center.dist(pivot) * 0.5);
}

function draw() {
  
  //console.log(PI);
  clear();
  background(69, 157, 193);
  let a = radians((frameCount/16 - 1) * 2) + PI * 0.5;
  let p = createVector(cos(a) * radius, sin(a) * radius).add(center);
  let piston = createVector(armLength + cos(a) * radius).add(center);
  let arm = new LineSegment().fromTwoPoints(p, piston);
  strokeWeight(10);
  arc(p.x - 20, p.y - 20, r * 0.5 * 0.5, 0, radians(crank.getAngle()));
  //if (frameCount % 2 == 0) { log.push(arm.p1) };
  //if (log.length > 90) { log.shift(); }
  fill(253, 219, 192); stroke(0);
  ellipse(center.x, center.y, radius * 2, radius * 2);
  textSize(20);
  ///console.log(center.x, piston.x, piston.x - center.x);
  text("theta = " + withoutDecimal(degrees(a % (2 * PI))).toString(), 100, 100);
  text("L = " + withoutDecimal(piston.x - center.x).toString(), piston.x - radius, piston.y);
  noFill();stroke(0);
  line(center.x, center.y, p.x, p.y);
  line(center.x, center.y, piston.x, piston.y);
  strokeWeight(3);
  // beginShape();
  // for (let i = 0; i < log.length; i ++) {
  //   vertex(log[i].x, log[i].y);
  // }
  // endShape();
  arm.draw();

  fill(255); strokeWeight(1);
  drawCircleMarker(center, 4);
  drawCircleMarker(p, 4);
  drawPiston(arm.p1, 16);
 // drawCircleMarker(pivot, 4);
}

class LineSegment {
  constructor(x0, y0, x1, y1) {
    this.p0 = createVector(x0, y0);
    this.p1 = createVector(x1, y1);
  }

  fromTwoPoints(p0, p1) {
    this.p0 = p0;
    this.p1 = p1;
    return this;
  }

  fromTwoPointsAndLength(p0, p1, length) {
    this.p0 = p0;
    let n = p1.copy().sub(p0).normalize();
    this.p1 = n.mult(length).add(p0);
    return this;
  }

  toLine() {
    return new Line().fromTwoPoints(this.p0, this.p1);
  }

  intersects(o) {
    if (o instanceof Line) {
      let t0 = o.a * this.p0.x + o.b * this.p0.y + o.c;
      let t1 = o.a * this.p1.x + o.b * this.p1.y + o.c;
      return t0 * t1 < 0;
    } else if (o instanceof LineSegment) {
      return this.intersects(o.toLine()) && o.intersects(this.toLine());
    }
    return undefined;
  }

  getIntersectionPoint(o) {
    if (o instanceof Line) {
      if (!this.intersects(o)) { return undefined; }
      return o.getIntersectionPoint(this.toLine());
    } else if (o instanceof LineSegment) {
      if (!this.intersects(o)) { return undefined; }
      return o.toLine().getIntersectionPoint(this.toLine());
    }
    return undefined;
  }

  getAngle() {
    return atan2(this.p1.y - this.p0.y, this.p1.x - this.p0.x);
  }

  getLength() {
    return p0.dist(p1);
  }

  getNearestPoint(p) {
    if (this.p1.copy().sub(this.p0).dot(p.copy().sub(this.p0)) < 0) return this.p0;
    if (this.p0.copy().sub(this.p1).dot(p.copy().sub(this.p1)) < 0) return this.p1;
    return this.toLine().getNearestPoint(p);
  }

  getBisection() {
    let o = this.getMidPoint();
    return this.toLine().getPerpendicular(o);
  }

  getMidPoint() {
    return this.p0.copy().add(this.p1).mult(0.5);
  }

  getPerpendicular(p) {
    return this.toLine().getPerpendicular(p);
  }

  getParallel(p) {
    return this.toLine().getParallel(p);
  }

  draw() {
    line(this.p0.x, this.p0.y, this.p1.x, this.p1.y);
  }
}

function drawLabel(x, y, label, align = CENTER) {
  push();
  strokeWeight(0);
  textFont("monospace");
  textSize(14);
  textAlign(align);
  if (align == LEFT) {x += 6;}
  if (align == RIGHT) {x -= 6;}
  text(label, x, y);
  pop();
}

function drawCircleMarker(p, size) {
  ellipse(p.x, p.y, size * 2, size * 2);
}
function drawPiston(p, size) {
  let height = size * 16;
  rect(p.x, p.y - height * 0.5, size * 2, height);
}

let withoutDecimal = (x) => Math.round(x);