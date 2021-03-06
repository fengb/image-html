var format = require('../util.js').format;
var PixelSegments = require('../pixel-segments.js');


module.exports = function(pixels, id){
  var pixelSegments = PixelSegments(pixels);

  return {
    css: format('#{0} { width: {1}px; margin: 0; overflow: hidden }\n' +
                '#{0} i { float: left; width: 1px; height: 1px; }',
                id, pixels.cols),

    html: (function(){
      var ret = format('<p id="{0}"\n>', id);
      for(var row=0; row < pixelSegments.length; row++){
        for(var segmentNum=0; segmentNum < pixelSegments[row].length; segmentNum++){
          var segment = pixelSegments[row][segmentNum];
          if(segment.length > 1){
            ret += format('<i style="background: {0}; width: {1}px"></i\n>',
                          segment.value.css(), segment.length);
          } else {
            ret += format('<i style="background: #{0}"></i\n>', segment.value.hex());
          }
        }
      }
      return ret + '</p>';
    })(),

    js: null
  };
};
