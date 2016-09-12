movers = [];
mm = 20;
  
function setup() {
  createCanvas(600, 600);
  f = createVector(random(width), random(height));
  newMovers();
}

function newMovers(){
 for(i = 0; i<mm ; i++){
   movers[i] = new Mover(random(1,5), random(width), random(height))
 }
}

function runMovers(){
  for(i = 0; i<mm; i++){
    movers[i].run();
  }
}

function draw() {
  background(0);
  runMovers();
}

function Mover(m, x, y) {
  this.mass = m;
  this.loc = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);

  this.applyForce = function(force) {
    //this.f = p5.Vector.div(this.force, this.mass);
    this.acc.add(force);
  }

  this.update = function() {
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.acc.mult(0);
  }

  this.show = function() {
    stroke(0);
    fill(255);
    ellipse(this.loc.x, this.loc.y, this.mass * 16, this.mass * 16);
  }

  this.checkEdges = function() {
    if (this.loc.x > width) {
      this.loc.x = width;
      this.vel.x *= -1;
    } else if (this.loc.x < 0) {
      this.vel.x *= -1;
      this.loc.x = 0;
    }

    if (this.loc.y > height) {
      this.vel.y *= -1;
      this.loc.y = height;
    }
  }
  
  this.run = function(){
    this.applyForce(f);
    this.update();
    this.show();
    this.checkEdges();
  }
}