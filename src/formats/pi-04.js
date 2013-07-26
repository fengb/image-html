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
    segment.styles = [
      util.format('background: #{0}', segment.value.hex()),
      util.format('width: {0}px', segment.length)
    ];
    styles.push(segment.styles);
  }
  var fmt = Formatter.fromStylesElements(styles);

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


var Aggregator = module.exports.Aggregator = function(stylesElements){
  return {
    tags: function(){
      var counter = util.counter();
      stylesElements.forEach(function(stylesElement){
        counter.add(stylesElement.join(','));
      });

      var sortedCounter = counter.sortByMostFrequent();
      var generator = util.generator('iba');
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
      stylesElements.forEach(function(stylesElement){
        flatStyles.push.apply(flatStyles, stylesElement);
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
      var ret = [util.format('{0} * { display: inline-block; height: 1px }', prepend)];
      for(var t in aggregate.tags){
        ret.push(util.format('{0} {1} { {2} }', prepend, t, aggregate.tags[t].join('; ')));
      }

      for(var c in aggregate.classes){
        ret.push(util.format('{0} .{1} { {2} }', prepend, aggregate.classes[c], c));
      }
      return ret;
    },

    valuesFor: function(searchStyles){
      for(var tag in aggregate.tags){
        if(util.arrayEquals(aggregate.tags[tag], searchStyles)){
          break;
        }
      }
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
        tag: tag,
        classes: classes.join(' '),
        styles: styles.join('; ')
      };
    },

    elementFor: function(searchStyles){
      var values = this.valuesFor(searchStyles);
      var attrs = '';
      if(values.classes){
        attrs += util.format(' class="{0}"', values.classes);
      }
      if(values.styles){
        attrs += util.format(' style="{0}"', values.styles);
      }
      return util.format('<{0}{1}></{0}\n>', values.tag, attrs);
    }
  };
};

Formatter.fromStylesElements = function(stylesElements){
  var agg = Aggregator(stylesElements);
  return Formatter(agg);
};
