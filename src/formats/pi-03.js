var util = require('../util');
var PixelSegments = require('../pixel-segments.js');


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
      return util.format('#{0} { width: {1}px; margin: 0; }\n' +
                         '#{0} i { display: inline-block; height: 1px; }\n',
                         id, pixels.cols) +
             classer.classes('#'+id).join('\n');
    },

    html: function(){
      var ret = util.format('<p id="{0}"\n>', id);
      for(var i=0; i < unrolledSegments.length; i++){
        var segment = unrolledSegments[i];
        ret += util.format('<i {0}></i\n>', classer.attrsFor(segment.styles));
      }
      return ret + '</p>';
    }
  };
};


function stringifyStyles(styleDict){
  var stringified = [];
  for(var key in styleDict){
    stringified.push(util.format('{0}: {1}', key, styleDict[key]));
  }
  return stringified;
}


var CssClasser = module.exports.CssClasser = function(styleDicts){
  var flatStyles = [];
  styleDicts.forEach(function(styleDict){
    flatStyles.push.apply(flatStyles, stringifyStyles(styleDict));
  });

  var counter = util.counter(flatStyles);
  var generator = util.endlessGenerator('abcdefghijklmnopqrstuvwxyz');
  var sortedCounter = counter.sortByMostFrequent();

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
