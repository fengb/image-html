ImageHtml.outputs.segments = function(pixels, id){
  var pixelSegments = PixelSegments(pixels);

  return {
    css: function(){
      return format('#{0} { width: {1}px; margin: 0; }' +
                    '#{0} i { display: inline-block; width: 1px; height: 1px; }',
                    id, pixels.cols);
    },

    html: function(){
      var ret = format('<p id="{0}">', id);
      for(var row=0; row < pixelSegments.length; row++){
        for(var segmentNum=0; segmentNum < pixelSegments[row].length; segmentNum++){
          var segment = pixelSegments[row][segmentNum];
          if(segment.length > 1){
            ret += format('<i style="background: #{0}; width: {1}px"></i>',
                          segment.value.hex(), segment.length);
          } else {
            ret += format('<i style="background: #{0}"></i>', segment.value.hex());
          }
        }
      }
      return ret + '</p>';
    }
  };
};
