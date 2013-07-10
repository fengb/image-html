ImageHtml.outputs.baseline = function(pixels, id){
  return {
    css: function(){
      return format('#{0} { width: {1}px; margin: 0; }' +
                    '#{0} i { display: inline-block; width: 1px; height: 1px; }',
                    id, pixels.cols);
    },

    html: function(){
      var ret = format('<p id="{0}">', id);
      for(var row=0; row < pixels.rows; row++){
        for(var col=0; col < pixels.cols; col++){
          ret += format('<i style="background: #{0}"></i>', pixels[row][col].hex());
        }
      }
      return ret + '</p>';
    }
  };
};
