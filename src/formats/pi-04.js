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
  var gen = new HtmlGenerator(styles);

  return {
    css: function(){
      return util.format('#{0} { width: {1}px; margin: 0; }\n' +
                         '#{0} i { display: inline-block; width: 1px; height: 1px; }\n',
                         id, pixels.cols) +
             gen.styles('#'+id).join('\n');
    },

    html: function(){
      return util.format('<p id="{0}"\n>{1}</p>', id,
                         unrolledSegments.map(function(s){
                           return gen.elementFor(s.styles);
                         }).join(''));
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


var HtmlGenerator = module.exports.HtmlGenerator = function(styleDicts){
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

HtmlGenerator.prototype.styles = function(prepend){
  var ret = [];
  for(var c in this._classes){
    ret.push(util.format('{0} .{1} { {2} }', prepend, this._classes[c], c));
  }
  return ret;
};

HtmlGenerator.prototype.elementFor = function(searchStyles){
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

  var attrs = [];
  if(classes.length > 0){
    attrs.push(util.format('class="{0}"', classes.join(' ')));
  }
  if(styles.length > 0){
    attrs.push(util.format('style="{0}"', styles.join('; ')));
  }
  return util.format('<i {0}></i>', attrs.join(' '));
};
