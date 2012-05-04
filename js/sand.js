

var Sand = function(options) {
  for (o in options) {
    this[o] = options[o];
  }
  this.Grain = this.Grain || Grain;
  this.status = this.status || "started";
  this.grains = this.grains || {
    moving: [],
    stopped: []
  };
  this.idSequence = 0;
};

Sand.prototype.addGrain = function(options) {
  options.context = options.context || this.context;
  options.id = this.idSequence;
  this.idSequence+=1;
  var grain = new this.Grain(options);
  if (grain.moving) {
    this.grains.moving.push(grain);
  } else {
    this.grains.stopped.push(grain);
  }
};

Sand.prototype.advance = function() {
  if (this.status === "started") {
    this.grains.moving.forEach(function(grain) {
      grain.advance();
      console.log("grain advance at location: " + grain.location[0] + " , " + grain.location[1]);
    });
  }
};
