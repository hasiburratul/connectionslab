let Tank = function(nickname, color, coordinates, angle) {
  this.player = nickname;
  this.color = color;

  this.coordinates = coordinates;
  this.dimensions = {width: 30, height: 30};

  this.velocity = 0;
  this.maxForwardVelocity = 3;
  this.maxBackwardsVelocity = -0.8;
  this.forwardAccel = 0.04;
  this.backwardsAccel = 0.08;
  this.decel = 0.03;
  this.angle = angle + 90*Math.PI/180;
  this.turretAngle = angle;

  this.upPressed = false;
  this.rightPressed = false;
  this.downPressed = false;
  this.leftPressed = false;

  this.health = 100;
  this.gameOver = 0;
};

Tank.prototype.nextCoords = function() {
  return {
    x: this.coordinates.x - Math.cos(this.angle)*this.velocity,
    y: this.coordinates.y - Math.sin(this.angle)*this.velocity
  };
}

Tank.prototype.updateTank = function() {
  if (this.downPressed) {
    this.moveBackwards();
  }
  // You shouldn't be able to press up and down at the same time! Down overrides up.
  else if (this.upPressed) {
    this.moveForward();
  }
  if (!this.upPressed && !this.downPressed && this.velocity !== 0) {
    this.slowDown();
  }
  if (this.rightPressed) {
    this.angle += (1 * Math.PI/180);
  }
  if (this.leftPressed) {
    this.angle -= (1 * Math.PI/180);
  }
};

Tank.prototype.moveForward = function() {
  if (this.velocity <= this.maxForwardVelocity - this.forwardAccel) {
    this.velocity += this.forwardAccel;
  }
  else {
    this.velocity = this.maxForwardVelocity;
  }

  if (!tankOrWallCollisions('front')) {
    this.move();
  }
  else {
    this.velocity = 0;
  }
};

Tank.prototype.moveBackwards = function() {
  if (this.velocity >= this.maxBackwardsVelocity + this.backwardsAccel) {
    this.velocity -= this.backwardsAccel;
  }
  else {
    this.velocity = this.maxBackwardsVelocity;
  }
  // Collisions
  if (!tankOrWallCollisions('back')) {
    this.move();
  }
  else {
    this.velocity = 0;
  }
};

Tank.prototype.slowDown = function() {
  if (this.velocity > 0) {
    this.move();
    this.velocity -= this.decel;
  }
  else {
    this.velocity = 0;
  }
};

Tank.prototype.move = function() {
  let nextX = this.nextCoords().x;
  let nextY = this.nextCoords().y;
  if (nextX >= 14 && nextX <= canvas.width - 14) this.coordinates.x = nextX;
  if (nextY >= 14 && nextY <= canvas.height - 14) this.coordinates.y = nextY;
};

Tank.prototype.getAttributes = function() {
  return {
    player: this.player,
    coordinates: this.coordinates,
    dimensions: this.dimensions,
    velocity: this.velocity,
    angle: this.angle,
    maxForwardVelocity: this.maxForwardVelocity,
    maxBackwardsVelocity: this.maxBackwardsVelocity,
    forwardAccel: this.forwardAccel,
    backwardsAccel: this.backwardsAccel,
    decel: this.decel,
    turretAngle: this.turretAngle,
    health: this.health,
    gameOver: this.gameOver
  }
};

Tank.prototype.setAttributes = function(tankProps) {
  this.player = tankProps.player;
  this.coordinates = tankProps.coordinates;
  this.dimensions = tankProps.dimensions;
  this.velocity = tankProps.velocity;
  this.angle = tankProps.angle;
  this.maxForwardVelocity = tankProps.maxForwardVelocity;
  this.maxBackwardsVelocity = tankProps.maxBackwardsVelocity;
  this.forwardAccel = tankProps.forwardAccel;
  this.backwardsAccel = tankProps.backwardsAccel;
  this.decel = tankProps.decel;
  this.turretAngle = tankProps.turretAngle;
  this.health = tankProps.health;
  this.gameOver = tankProps.gameOver;
};

Tank.prototype.moveTurret = function(mouseX,mouseY) {
  let yDif = (mouseY - this.coordinates.y);
  let xDif = (mouseX - this.coordinates.x);
  this.turretAngle = (Math.atan2(yDif,xDif) + Math.PI/2);
};

Tank.prototype.createBullet = function() {
  let xCoord = 30*Math.cos(this.turretAngle - Math.PI/2) + this.coordinates.x;
  let yCoord = 30*Math.sin(this.turretAngle - Math.PI/2) + this.coordinates.y;
  let bullet = new Bullet(this.turretAngle,xCoord,yCoord);
  bullets.push(bullet);
};

// The next front point and the current corner points of the tank
// Front is an optional boolean
Tank.prototype.collisionPoints = function(front) {
  let rotAngle = this.angle - Math.PI/4;
  let hyp = Math.sqrt(Math.pow(this.dimensions.height,2) + Math.pow(this.dimensions.width,2))/2;
  let tL = {x: this.coordinates.x - hyp*Math.cos(rotAngle),
            y: this.coordinates.y - hyp*Math.sin(rotAngle) };
  let tR = {x: this.coordinates.x + hyp*Math.sin(rotAngle),
            y: this.coordinates.y - hyp*Math.cos(rotAngle) };
  let bL = {x: this.coordinates.x - hyp*Math.sin(rotAngle),
            y: this.coordinates.y + hyp*Math.cos(rotAngle) };
  let bR = {x: this.coordinates.x + hyp*Math.cos(rotAngle),
            y: this.coordinates.y + hyp*Math.sin(rotAngle) };
  if (front) {
    let frX = this.coordinates.x - this.dimensions.width/2 * Math.cos(this.angle);
    let frY = this.coordinates.y - this.dimensions.height/2 * Math.sin(this.angle);
    let fr = {x: frX - Math.cos(this.angle)*this.velocity,
              y: frY - Math.sin(this.angle)*this.velocity };
    return {fr: fr, tL: tL, tR: tR, bL: bL, bR: bR};
  }
  else {
    return {tL: tL, tR: tR, bL: bL, bR: bR};
  }
};
