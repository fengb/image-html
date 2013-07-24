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
    segment.styles = {
      background: '#' + segment.value.hex(),
      width: segment.length + 'px',
      height: '1px'
    };
    styles.push(segment.styles);
  }
  var gen = new HtmlGenerator(styles);

  return {
    css: function(){
      return util.format('#{0} { width: {1}px; margin: 0; }\n',
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


module.exports.HtmlGenerator = function(styleDicts){
  var private = {
    stringifyStyles: function(styleDict){
      var stringified = [];
      for(var key in styleDict){
        stringified.push(util.format('{0}: {1}', key, styleDict[key]));
      }
      return stringified;
    }
  };

  private.classes = function(){
    var flatStyles = [];
    styleDicts.forEach(function(styleDict){
      flatStyles.push.apply(flatStyles, private.stringifyStyles(styleDict));
    });

    var counter = util.counter(flatStyles);
    var generator = util.generator('abcdefghijklmnopqrstuvwxyz');
    var sortedCounter = counter.sortByMostFrequent();

    var classes = {};
    for(var i=0; i < sortedCounter.length; i++){
      var key = sortedCounter[i][0];
      var val = sortedCounter[i][1];
      if(val > 1){
        classes[key] = generator();
      }
    }
    return classes;
  }();


  var public = {
    commonStyles: util.memoize(function(attr){
      var counter = util.counter();
      for(var i=0; i < styleDicts.length; i++){
        if(styleDicts[i][attr]){
          counter.add(styleDicts[i][attr]);
        }
      }
      var sortedCounter = counter.sortByMostFrequent();
      var ret = [];
      for(i=0; i < sortedCounter.length; i++){
        if(sortedCounter[i][1] > 1){
          ret.push(sortedCounter[i][0]);
        }
      }
      return ret;
    }),

    styles: function(prepend){
      var ret = [util.format('{0} * { display: inline-block; }', prepend)];
      for(var c in private.classes){
        ret.push(util.format('{0} .{1} { {2} }', prepend, private.classes[c], c));
      }
      return ret;
    },

    valuesFor: function(searchStyles){
      searchStyles = private.stringifyStyles(searchStyles);

      var classes = [];
      var styles = [];
      for(var i=0; i < searchStyles.length; i++){
        var style = searchStyles[i];
        if(private.classes[style]){
          classes.push(private.classes[style]);
        } else {
          styles.push(style);
        }
      }

      return {
        element: 'i',
        classes: classes.join(' '),
        styles: styles.join('; ')
      };
    },

    elementFor: function(searchStyles){
      var values = public.valuesFor(searchStyles);
      var attrs = '';
      if(values.classes){
        attrs += util.format(' class="{0}"', values.classes);
      }
      if(values.styles){
        attrs += util.format(' style="{0}"', values.styles);
      }
      return util.format('<{0}{1}></{0}\n>', values.element, attrs);
    }
  };
  return public;
};

