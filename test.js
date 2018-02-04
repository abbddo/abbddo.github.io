
let center, crank, piston, r, armLength, slider, speed;
function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    center = createVector(width * 0.25, height * 0.5);
    armLength = width * 0.5;
    r = 200;
    L = 300; //distance between center and piston
    crank = new Crank(r, center);
    piston = new Piston (center.x + 2 * r, center.y, r);

    //sliders
    slider = createSlider(0.1, 20, 1);
    slider.position(10, 10);
    slider.style('width', '80px');
}

function draw() {
    clear();
    angleMode(DEGREES);
    speed = frameCount/slider.value();
    background('gray');
    console.log(L);
    fill(159, 159, 159); stroke(33);
    ellipse(center.x, center.y, r, r);
    fill(255);
    ellipse(center.x, center.y, r * 0.05, r * 0.05);
   // console.log();
    strokeWeight(5);
    line(crank.p.x, crank.p.y, L + piston.x + center.x, piston.y);
    line(crank.p.x, crank.p.y, center.x, center.y);
    // text
    textSize(20);
    fill(255);
    strokeWeight(3);
    text("" + crank.getAngle(), 100, 100);
    text("A", center.x, center.y + 20);
    text("B", crank.p.x, crank.p.y - 20);
    strokeWeight(1);
    crank.move();
    crank.show();
    fill(253, 219, 192, 100); stroke(33);
    arc(center.x, center.y, 100, 100, -crank.getAngle(), 0);
    piston.move();
    piston.show();
}

class Piston {
    constructor(posX, posY, r) {
        let x, y;
        this.x = x;
        this.y = posY;
        this.posX = posX;
        this.posY = posY;
        this.r = r;
        
    }
    move() {
        let angle = speed + 180;
        this.x = -r * 0.5 * cos(angle);        
    }
    show() {
        translate(center.x, center.y - r * 0.5);
        fill(255); stroke(10);
        text("C", L + this.x - this.r * 0.1 , 0 + 0.5 * r);
        rect(L + this.x, 0, this.r * 0.05, this.r);
    }
}

class Crank {
    constructor(r, center){
        this.angle = 180;
        this.r = r;
        this.center = center;
        this.p = createVector(-r * 0.5 * cos(this.angle), r * 0.5 * sin(this.angle)).add(center);
    }
    show(){
        fill(255);
        ellipse(this.p.x, this.p.y, r * 0.05, r * 0.05);
    }
    move(){
        this.angle = speed + 180;
        this.p = createVector(-r * 0.5 * cos(this.angle), r * 0.5 * sin(this.angle)).add(center);
    }
    getAngle() {
        return (this.angle + 180) % 360;
    }
}