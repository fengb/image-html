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
  var fmt = Formatter.fromStyleDicts(styles);

  return {
    css: function(){
      return util.format('#{0} { width: {1}px; margin: 0; }\n',
                         id, pixels.cols) +
             fmt.styles('#'+id).join('\n');
    },

    html: function(){
      return util.format('<p id="{0}"\n>{1}</p>', id,
                         unrolledSegments.map(function(s){
                           return fmt.elementFor(s.styles);
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


module.exports.Aggregator = function(styleDicts){
  return {
    tags: function(){
      var counter = util.counter();
      styleDicts.forEach(function(styleDict){
        counter.add(stringifyStyles(styleDict).join(','));
      });

      var sortedCounter = counter.sortByMostFrequent();
      var generator = util.generator('ibaq');
      var tags = {};
      for(var i=0; i < sortedCounter.length; i++){
        var key = sortedCounter[i][0];
        var val = sortedCounter[i][1];
        var nextTag = generator();
        if(val <= 1 || nextTag === null){
          break;
        }
        tags[nextTag] = key.split(',');
      }
      return tags;
    }(),

    classes: function(){
      var flatStyles = [];
      styleDicts.forEach(function(styleDict){
        flatStyles.push.apply(flatStyles, stringifyStyles(styleDict));
      });

      var counter = util.counter(flatStyles);
      var generator = util.endlessGenerator('abcdefghijklmnopqrstuvwxyz');
      var sortedCounter = counter.sortByMostFrequent();

      var classes = {};
      for(var i=0; i < sortedCounter.length; i++){
        var key = sortedCounter[i][0];
        var val = sortedCounter[i][1];
        if(val <= 1){
          break;
        }
        classes[key] = generator();
      }
      return classes;
    }()
  };
};

var Formatter = module.exports.Formatter = function(aggregate){
  return {
    styles: function(prepend){
      var ret = [util.format('{0} * { display: inline-block }', prepend)];
      for(var c in aggregate.classes){
        ret.push(util.format('{0} .{1} { {2} }', prepend, aggregate.classes[c], c));
      }
      return ret;
    },

    valuesFor: function(searchStyles){
      searchStyles = stringifyStyles(searchStyles);

      var classes = [];
      var styles = [];
      for(var i=0; i < searchStyles.length; i++){
        var style = searchStyles[i];
        if(aggregate.classes[style]){
          classes.push(aggregate.classes[style]);
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
};

Formatter.fromStyleDicts = function(styleDicts){
  var agg = Aggregator(styleDicts);
  return Formatter(agg);
};
