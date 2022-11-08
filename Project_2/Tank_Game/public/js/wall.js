let Wall = function(tLX, tLY, width, height) {
  // the anchor is the top-left corner. More useful than the center
  this.anchor = {x: tLX, y: tLY};
  this.width = width;
  this.height = height;
}

Wall.prototype.getCorners = function() {
  let tL = { x: this.anchor.x, y: this.anchor.y };
  let tR = { x: this.anchor.x + this.width, y: this.anchor.y };
  let bR = { x: this.anchor.x + this.width, y: this.anchor.y + this.height };
  let bL = { x: this.anchor.x, y: this.anchor.y + this.height };
  return {tL: tL, tR: tR, bR: bR, bL: bL};
}
