/*! image-html v0.2.0 - https://github.com/fengb/image-html */
;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
window.ImageHtml = require('./src/image-html');

},{"./src/image-html":8}],2:[function(require,module,exports){

module.exports = function Canvas (w, h) {
  var canvas = document.createElement('canvas')
  canvas.width = w || 300
  canvas.height = h || 150
  return canvas
}

},{}],3:[function(require,module,exports){
var Color = module.exports = function(r, g, b){
  this.r = r;
  this.g = g;
  this.b = b;
};

Color.prototype.equals = function(that){
  return this.constructor === (that && that.constructor) &&
         this.r === that.r &&
         this.g === that.g &&
         this.b === that.b;
};

Color.prototype.rgb = function(){
  return [this.r, this.g, this.b];
};

function hexify(num){
  var ret = num.toString(16);
  return ret.length == 1 ? '0' + ret : ret;
}

Color.prototype.hex = function(){
  return hexify(this.r) + hexify(this.g) + hexify(this.b);
};

Color.rgb = function(r, g, b){
  return new Color(r, g, b);
};

Color.hex = function(hex){
  return new Color(parseInt(hex.substring(0, 2), 16),
                   parseInt(hex.substring(2, 4), 16),
                   parseInt(hex.substring(4, 6), 16));
};

},{}],4:[function(require,module,exports){
var util = require('./util');


function stringifyStyles(styleDict){
  var stringified = [];
  for(var key in styleDict){
    stringified.push(util.format('{0}: {1}', key, styleDict[key]));
  }
  return stringified;
}


var CssClasser = module.exports = function(styleDicts){
  var flatStyles = [];
  styleDicts.forEach(function(styleDict){
    flatStyles.push.apply(flatStyles, stringifyStyles(styleDict));
  });

  var counter = util.counter(flatStyles);
  var generator = util.generator('abcdefghijklmnopqrstuvwxyz');
  var sortedCounter = util.objToArray(counter).sort(function(a, b){
    return a[1] < b[1] ?  1 :
           a[1] > b[1] ? -1 : 0;
  });

  this._classes = {};
  for(var i=0; i < sortedCounter.length; i++){
    var key = sortedCounter[i][0];
    var val = sortedCounter[i][1];
    if(val > 1){
      this._classes[key] = generator();
    }
  }
};

CssClasser.prototype.classes = function(prepend){
  var ret = [];
  for(var c in this._classes){
    ret.push(util.format('{0} .{1} { {2} }', prepend, this._classes[c], c));
  }
  return ret;
};

CssClasser.prototype.attrsFor = function(searchStyles){
  searchStyles = stringifyStyles(searchStyles);

  var classes = [];
  var styles = [];
  for(var i=0; i < searchStyles.length; i++){
    var style = searchStyles[i];
    if(this._classes[style]){
      classes.push(this._classes[style]);
    } else {
      styles.push(style);
    }
  }

  var ret = [];
  if(classes.length > 0){
    ret.push(util.format('class="{0}"', classes.join(' ')));
  }
  if(styles.length > 0){
    ret.push(util.format('style="{0}"', styles.join('; ')));
  }
  return ret.join(' ');
};

},{"./util":11}],5:[function(require,module,exports){
var format = require('../util.js').format;


module.exports = function(pixels, id){
  return {
    css: function(){
      return format('#{0} { width: {1}px; margin: 0; }\n' +
                    '#{0} i { display: inline-block; width: 1px; height: 1px; }',
                    id, pixels.cols);
    },

    html: function(){
      var ret = format('<p id="{0}"\n>', id);
      for(var row=0; row < pixels.rows; row++){
        for(var col=0; col < pixels.cols; col++){
          ret += format('<i style="background: #{0}"></i\n>', pixels[row][col].hex());
        }
      }
      return ret + '</p>';
    }
  };
};

},{"../util.js":11}],6:[function(require,module,exports){
var format = require('../util.js').format;
var PixelSegments = require('../pixel-segments.js');


module.exports = function(pixels, id){
  var pixelSegments = PixelSegments(pixels);

  return {
    css: function(){
      return format('#{0} { width: {1}px; margin: 0; }\n' +
                    '#{0} i { display: inline-block; width: 1px; height: 1px; }',
                    id, pixels.cols);
    },

    html: function(){
      var ret = format('<p id="{0}"\n>', id);
      for(var row=0; row < pixelSegments.length; row++){
        for(var segmentNum=0; segmentNum < pixelSegments[row].length; segmentNum++){
          var segment = pixelSegments[row][segmentNum];
          if(segment.length > 1){
            ret += format('<i style="background: #{0}; width: {1}px"></i\n>',
                          segment.value.hex(), segment.length);
          } else {
            ret += format('<i style="background: #{0}"></i\n>', segment.value.hex());
          }
        }
      }
      return ret + '</p>';
    }
  };
};

},{"../pixel-segments.js":9,"../util.js":11}],7:[function(require,module,exports){
var format = require('../util.js').format;
var PixelSegments = require('../pixel-segments.js');
var CssClasser = require('../css-classer.js');


module.exports = function(pixels, id){
  var pixelSegments = PixelSegments(pixels);
  var unrolledSegments = [];
  for(var row=0; row < pixelSegments.length; row++){
    unrolledSegments.push.apply(unrolledSegments, pixelSegments[row]);
  }

  var styles = [];
  for(var i=0; i < unrolledSegments.length; i++){
    var segment = unrolledSegments[i];
    segment.styles = {background: '#' + segment.value.hex(),
                      width: segment.length + 'px'};
    styles.push(segment.styles);
  }
  var classer = new CssClasser(styles);

  return {
    css: function(){
      return format('#{0} { width: {1}px; margin: 0; }\n' +
                    '#{0} i { display: inline-block; width: 1px; height: 1px; }\n',
                    id, pixels.cols) +
             classer.classes('#'+id).join('\n');
    },

    html: function(){
      var ret = format('<p id="{0}"\n>', id);
      for(var i=0; i < unrolledSegments.length; i++){
        var segment = unrolledSegments[i];
        ret += format('<i {0}></i\n>', classer.attrsFor(segment.styles));
      }
      return ret + '</p>';
    }
  };
};

},{"../css-classer.js":4,"../pixel-segments.js":9,"../util.js":11}],8:[function(require,module,exports){
var Pixels = require('./pixels');
var formats = {
  'pi-01': require('./formats/pi-01'),
  'pi-02': require('./formats/pi-02'),
  'pi-03': require('./formats/pi-03')
};

var ImageHtml = module.exports = {
  formats: function(){
    return Object.keys(formats);
  },

  convert: function(image, id, format){
    format = format || 'pi-03';
    var pixels = Pixels.fromImage(image);
    return formats[format](pixels, id);
  }
};

},{"./formats/pi-01":5,"./formats/pi-02":6,"./formats/pi-03":7,"./pixels":10}],9:[function(require,module,exports){
module.exports = function(pixels){
  var rows = [];
  for(var row=0; row < pixels.rows; row++){
    rows[row] = [];
    var last = {value: null};
    for(var col=0; col < pixels.cols; col++){
      if(pixels[row][col].equals(last.value)){
        last.length++;
      } else{
        last = {length: 1, value: pixels[row][col]};
        rows[row].push(last);
      }
    }
  }
  return rows;
};

},{}],10:[function(require,module,exports){
var Color = require('./color');
var Canvas = require('canvas-browserify');

var Pixels = module.exports = function(colorsMatrix){
  this.rows = colorsMatrix.length;
  this.cols = colorsMatrix[0].length;

  for(var row=0; row < this.rows; row++){
    this[row] = colorsMatrix[row];
  }
};

Pixels.fromImage = function(domImage){
  var canvas = new Canvas(domImage.width, domImage.height);
  var ctx = canvas.getContext('2d');
  ctx.drawImage(domImage, 0, 0);
  var imageData = ctx.getImageData(0, 0, domImage.width, domImage.height).data;

  var colors = [];
  for(var row=0; row < domImage.height; row++){
    colors[row] = [];
    for(var col=0; col < domImage.width; col++){
      var i = (row*domImage.width + col) * 4;
      var r = imageData[i];
      var g = imageData[i+1];
      var b = imageData[i+2];
      var a = imageData[i+3];
      colors[row][col] = Color.rgb(r,g,b,a);
    }
  }

  return new Pixels(colors);
};

},{"./color":3,"canvas-browserify":2}],11:[function(require,module,exports){
module.exports = {
  format: function() {
    var regexes = [];
    for(var i=0; i < 10; i++) {
      regexes[i] = new RegExp('\\{' + i + '\\}', 'gm');
    }

    return function() {
      var s = arguments[0];
      for(var i=1; i < arguments.length; i++) {
        s = s.replace(regexes[i-1], arguments[i]);
      }

      return s;
    };
  }(),

  counter: function(array){
    var ret = {};
    for(var i=0; i < array.length; i++){
      var val = array[i];
      ret[val] = (ret[val] || 0) + 1;
    }
    return ret;
  },

  objToArray: function(obj){
    var array = [];
    for(var key in obj){
      array.push([key, obj[key]]);
    }
    return array;
  },

  generator: function(chars){
    var indexes = [];

    return function(){
      var i = 0;
      while(true){
        if(i >= indexes.length){
          indexes.push(0);
          break;
        }

        if(++indexes[i] < chars.length){
          break;
        }

        indexes[i++] = 0;
      }
      return indexes.map(function(i){ return chars[i]; }).join('');
    };
  }
};

},{}]},{},[1])
;