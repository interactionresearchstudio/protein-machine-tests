let pSystem;

function setup() {
  createCanvas(400, 400);

  pSystem = new ParticleSystem(50);

  for (let i = 0; i < 50; i++) {
    const radius = random(20, 40);
    pSystem.addParticle(random(0, width), random(0, height), radius);
  }
  pSystem.particles.forEach((p) => {
    console.log(p.position);
  });
}

function draw() {
  background(125, 255, 0);
  fill(100, 160, 10);
  noStroke();
  pSystem.run();
}

let ParticleSystem = function(maxParticles) {
  this.maxParticles = maxParticles;
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function(x, y, radius) {
  // if (!this.isFull()) {
    this.particles.push(new Particle(
      createVector(x, y),
      radius // radius
    ));
  // }
};

ParticleSystem.prototype.isFull = function() {
  return this.particles.length >= this.maxParticles;
}

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    this.particles[i].draw();
  }
};

let Particle = function(position, radius) {
  this.noiseSeed = random(0, 1000);
  this.position = position;
  this.radius = radius;
  this.yoff = 0.0;
}

Particle.prototype.draw = function() {
  push();
  noiseSeed(this.noiseSeed);
  translate(this.position.x + noise(frameCount * this.noiseSeed) * 10, this.position.y + noise((frameCount + 10000) * this.noiseSeed) * 10);
  beginShape();
  let xoff = 0;
  for (var a = 0; a < TWO_PI; a += 0.1) {
    let offset = map(noise(xoff + this.noiseSeed, this.yoff), 0, 1, this.radius/-4, this.radius/4);
    let r = this.radius + offset;
    let x = r * cos(a);
    let y = r * sin(a);
    curveVertex(x, y);
    xoff += 0.1;
  }
  endShape();
  pop();

  // circle(this.position.x, this.position.y, this.radius);

  drawingContext.filter = `blur(10px)`

  this.yoff += 0.01;
}