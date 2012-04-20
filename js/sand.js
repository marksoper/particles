


var Sand = function(options) {
  for (var key in options) {
    this[key] = options[key]
  }
  this.colors = this.colors || {};
  this.alpha = this.alpha || 255;
};

Sand.prototype.setColorWeight = function(color, weight) {
  if (weight === 0) {
    delete this.colors[color];
  }
  if (weight > 0 && weight <= 1) {
    this.colors[color] = weight;
    this.normalizeColors({locked: [color]});
  }
};

Sand.prototype.normalizeColors = function(options) {
  options = options || {};
  var locked = options.locked || [];
  var sum = {
    locked: 0.0,
    free: 0.0
  };
  for (var color in this.colors) {
    (color in locked) ? (sum.locked += this.colors[color]) : (sum.free += this.colors[color]);
  }
  for (var color in this.colors) {
    if (!(color in locked)) {
      this.colors[color] = this.colors[color] * ( (1 - sum.locked) / sum.free );
    }
  }
  this.indexColors();
};

Sand.prototype.indexColors = function() {
  this.colorIndex = [];
  var colorWeights = [];
  for (var color in this.colors) {
    rgb = this.hexToRGB(color);
    colorWeights.push({
      color: rgb,
      weight: this.colors[color]
    });
  }
  colorWeights.sort(function(a,b) {
    if (a.weight < b.weight) {
      return 1;
    }
    if (b.weight > b.weight) {
      return -1;
    }
    return 0;
  });
  var cumul = 0.0;
  for (var cwi in colorWeights) {
    var cwv = colorWeights[cwi];
    var entry = {
      color: cwv.color,
      threshold: cumul + cwv.weight
    };
    cumul = entry.threshold;
    this.colorIndex.push(entry);
  }
};

Sand.prototype.getRandomColor = function() {
  var r = Math.random();
  for (cii in this.colorIndex) {
    var civ = this.colorIndex[cii];
    if (r <= civ.threshold) {
      return civ.color;
    }
  }
  console.log('error - return without color');
};

Sand.prototype.hexToRGB = function(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

Sand.prototype.setImageData = function(data) {
  for (var i = 0, n = data.length; i < n; i += 4) {
    var color = this.getRandomColor();
    data[i  ] = color.r;
    data[i+1] = color.g;
    data[i+2] = color.b;
    data[i+3] = this.alpha;
  }
};

