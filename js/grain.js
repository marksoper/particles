
var DEFAULT_GRAIN_COLOR = "rgba(255,127,0,1.0)";
var DEFAULT_GRAIN_HEIGHT = 10;  // pixels
var DEFAULT_GRAIN_WIDTH = 10;  // pixels
var DEFAULT_GRAIN_LOCATION = [0,0];
var DEFAULT_GRAIN_VELOCITY = [20,5];  // pixels per frame
var DEFAULT_GRAIN_MOVING = true;

var Grain = function(options) {
  this.context = options.context;
  this.color = options.color || DEFAULT_GRAIN_COLOR;
  this.height = options.height || DEFAULT_GRAIN_HEIGHT;
  this.width = options.width || DEFAULT_GRAIN_HEIGHT;
  this.location = options.location || DEFAULT_GRAIN_LOCATION;
  this.velocity = options.velocity || DEFAULT_GRAIN_VELOCITY;
  this.moving = options.moving || DEFAULT_GRAIN_MOVING;
};

Grain.prototype.draw = function(location) {
  location = location || this.location;
  this.context.fillStyle = this.color;
  this.context.fillRect(location[0], location[1], this.width, this.height);
};

Grain.prototype.clear = function() {
  this.context.clearRect(this.location[0], this.location[1], this.width, this.height);
};

Grain.prototype.relocate = function(frames) {
  frames = frames || 1;
  this.location = [ this.location[0] + (frames * this.velocity[0]), this.location[1] + (frames * this.velocity[1]) ];
};

Grain.prototype.next = function() {
  if (this.moving !== true) {
    console.log("Warning: next called to animate a stopped grain");
  }
  this.clear();
  this.relocate();
  this.draw();
};
