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
