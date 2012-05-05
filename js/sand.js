

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
  this.bounds = this.bounds || {
    top: 0,
    right: this.canvas.width,
    bottom: this.canvas.height,
    left: 0
  };
  this.edges = this.edges || {
    top: {
      type: "bound",
      value: 0
    },
    right: {
      type: "bound",
      value: this.canvas.width
    },
    bottom: {
      type: "container",
      value: [[canvas.width, this.canvas.height]]
    },
    left: {
      type: "bound",
      value: 0
    }
  };
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

Sand.prototype.detectContainer = function(grain, containerValue) {
  for (var ci in containerValue) {
    var xstop = containerValue[ci][0];
    var yval = containerValue[ci][1];
    if ( (grain.location[0] < xstop) && (grain.location[1] > yval) ) {
      return containerValue[ci];
    }
  }
  return null;
};

Sand.prototype.detectEdges = function(grain) {
  var hits = {
    top: null,
    right: null,
    bottom: null,
    left: null
  };
  if (this.edges.top.type === "bound") {  // top container not supported
    if ( (grain.location[1] - grain.height) < this.edges.top.value ) {
      hits.top = {
        type: this.edges.top.type,
        value: grain.location[0]
      };
      return hits;
    }
  }
  if (this.edges.right.type === "bound") {  // right container not supported
    if ( grain.location[0] > this.edges.right.value ) {
      hits.right = {
        type: this.edges.right.type,
        value: grain.location[1]
      };
      return hits;
    }
  }
  if (this.edges.bottom.type === "container") {  // only container supported for bottom
    hits.bottom = {
      type: this.edges.bottom.type,
      value: this.detectContainer(grain, this.edges.bottom.value)
    };
    return hits;
  }
  if (this.edges.left.type === "bound") {  // left container not supported
    if ( (grain.location[0] - grain.width) < this.edges.left.value ) {
      hits.left = {
        type: this.edges.left.type,
        value: grain.location[1]
      };
      return hits;
    }
  }
  return hits;
};

Sand.prototype.advance = function() {
  var self = this;
  if (this.status === "started") {
    this.grains.moving.forEach(function(grain) {
      grain.advance();
      console.log("grain advance at location: " + grain.location[0] + " , " + grain.location[1]);
    });
    this.grains.moving.forEach(function(grain) {
      var hits = self.detectEdges(grain);
      for (var e in hits) {
        if (hits[e]) {
          if (hits[e].type === "bound") {
            grain.visible = false;
            delete this.grains.moving(this.grains.moving.indexOf(grain));
          } else if (hits[e].type === "container") {
            grain.moving = false;
            this.grains.stopped.push(grain);
            delete this.grains.moving(this.grains.moving.indexOf(grain));
          }
        }
      }
    });
  }
};

