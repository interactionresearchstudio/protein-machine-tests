let system;

function setup() {
  createCanvas(400, 600);
  system = new ParticleSystem({
    min_x: 0,
    max_x: width,
    min_y: 0,
    max_y: 200,
  }, 100, 10);

  system2 = new ParticleSystem({
    min_x: 0,
    max_x: width,
    min_y: 200,
    max_y: 400,
  }, 100, 30);

  system3 = new ParticleSystem({
    min_x: 0,
    max_x: width,
    min_y: 400,
    max_y: 600,
  }, 100, 50);

  //frameRate();
}

function draw() {
  background(214, 175, 139);

  system.addParticle();
  system.addParticle();
  system.addParticle();
  system.addParticle();
  system.addParticle();
  system.addParticle();
  system.addParticle();
  system.addParticle();
  system.run();

  drawingContext.filter = `blur(0px)`;
  strokeWeight(0);
  fill(214, 175, 139);
  rect(0, 200, width, 400);

  system2.addParticle();
  system2.run();

  drawingContext.filter = `blur(0px)`;
  strokeWeight(0);
  fill(214, 175, 139);
  rect(0, 400, width, 600);

  system3.addParticle();
  system3.addParticle();
  system3.addParticle();
  system3.run();

  drawingContext.filter = `blur(0px)`;
  strokeWeight(4);
  stroke(0);
  line(0, 200, width, 200);
  line(0, 400, width, 400);
}

// A simple Particle class
let Particle = function(position, maxSize) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(random(-0.1, 0.1), random(-0.1, 0.1));
  this.position = position.copy();
  this.initialLifespan = random(50, 255);
  this.lifespan = this.initialLifespan;
  this.blur = 10;
  this.maxSize = maxSize;
};

// Run function
Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
  strokeWeight(0);
  fill(156, 101, 50, this.lifespan * 1.5);
  let ellipseSize = 0;
  if (this.lifespan > this.initialLifespan / 2) {
    ellipseSize = map(this.lifespan, this.initialLifespan, this.initialLifespan/2, 0, this.maxSize)
  } else {
    ellipseSize = map(this.lifespan, this.initialLifespan/2, 0, this.maxSize, 0)
  }
  ellipse(this.position.x, this.position.y, ellipseSize);
  drawingContext.filter = `blur(${this.blur}px)`
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  return this.lifespan < 0;
};

let ParticleSystem = function(area, size, maxParticleSize) {
  this.area = area;
  this.size = size;
  this.maxParticleSize = maxParticleSize;
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  if (!this.isFull()) {
    this.particles.push(new Particle(
      createVector(random(this.area.min_x, this.area.max_x), random(this.area.min_y, this.area.max_y)), this.maxParticleSize
    ));
  }
};

ParticleSystem.prototype.isFull = function() {
  if (this.particles.length >= this.size) {
    return true;
  } else {
    return false;
  }
}

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};

let map = function(x, in_min, in_max, out_min, out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}