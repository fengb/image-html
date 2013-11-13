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
      util.format('background: {0}', segment.value.css()),
      util.format('width: {0}px', segment.length)
    ];
    styles.push(segment.styles);
  }
  var fmt = Formatter.fromStylesElements(styles);

  return {
    css: function(){
      return util.format('#{0} { width: {1}px; margin: 0; overflow: hidden }\n'+
                         '#{0} * { float: left; height: 1px; vertical-align: baseline; margin: 0; padding: 0; border-collapse: collapse }\n'+
                         '#{0} *:before { content: "" }\n'+
                         '#{0} *:after { content: "" }\n',
                         id, pixels.cols) +
             fmt.styles('#'+id).join('\n');
    },

    html: function(){
      return util.format('<div id="{0}"\n>{1}</div>', id,
                         unrolledSegments.map(function(s){
                           return fmt.elementFor(s.styles);
                         }).join(''));
    }
  };
};


function bestMatch(tags, stylesElement){
  for(var tag in tags){
    if(util.arrayEquals(tags[tag], stylesElement)){
      return {
        tag: tag,
        unmatchedStyles: []
      };
    }
  }

  /* Tag matches one thing */
  for(var t in tags){
    for(var i=0; i < stylesElement.length; i++){
      var tagStyles = tags[t];
      if(t.length < 3 && tags[t].indexOf(stylesElement[i]) != -1){
        return {
          tag: t,
          unmatchedStyles: util.arrayDiff(stylesElement, tagStyles || [])
        };
      }
    }
  }
  return {
    tag: null,
    unmatchedStyles: stylesElement
  };
}


var Aggregator = module.exports.Aggregator = function(stylesElements){
  var tags = function(){
    var counter = util.counter();
    stylesElements.forEach(function(stylesElement){
      counter.add(stylesElement.join(';'));
    });

    var sortedCounter = counter.sortByMostFrequent();
    var generator = util.generator([
      'i', 'b', 'a', 'p', 'q', 'u', 's',
      'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ol', 'ul', 'dl',
      'dfn', 'kbd', 'var', 'ins', 'del', 'sup', 'sub', 'nav', 'pre', 'div', 'bdi',
      'span', 'samp', 'code', 'abbr', 'form', 'cite', 'mark', 'menu',
      'small', 'aside', 'table'
    ]);
    var tags = {};
    for(var i=0; i < sortedCounter.length; i++){
      var key = sortedCounter[i][0];
      var val = sortedCounter[i][1];
      var nextTag = generator();
      if(val <= 1 || nextTag === null){
        break;
      }
      tags[nextTag] = key.split(';');
    }
    return tags;
  }();

  return {
    tags: tags,
    classes: function(){
      var counter = util.counter();
      stylesElements.forEach(function(stylesElement){
        var unmatchedStyles = bestMatch(tags, stylesElement).unmatchedStyles;
        for(var i=0; i < unmatchedStyles.length; i++){
          counter.add(unmatchedStyles[i]);
        }
      });

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
  var self = {
    defaultTag: function(){
      var tag;
      for(var t in aggregate.tags){
        if(!tag || t.length < tag.length){
          tag = t;
        }
      }
      return tag;
    }(),

    styles: function(prepend){
      var ret = [];
      for(var t in aggregate.tags){
        ret.push(util.format('{0} {1} { {2} }', prepend, t, aggregate.tags[t].join('; ')));
      }

      for(var c in aggregate.classes){
        ret.push(util.format('{0} .{1} { {2} }', prepend, aggregate.classes[c], c));
      }
      return ret;
    },

    valuesFor: function(searchStyles){
      var match = bestMatch(aggregate.tags, searchStyles);
      var tag = match.tag || self.defaultTag;

      var classes = [];
      var styles = [];
      for(var i=0; i < match.unmatchedStyles.length; i++){
        var style = match.unmatchedStyles[i];
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
      var values = self.valuesFor(searchStyles);
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
  return self;
};

Formatter.fromStylesElements = function(stylesElements){
  var agg = Aggregator(stylesElements);
  return Formatter(agg);
};
