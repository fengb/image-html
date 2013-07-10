ImageHtml.outputs.baseline = function(pixels, id){
  return {
    css: function(){
      return format('#{0} { width: {1}px; margin: 0; }' +
                    '#{0} i { display: inline-block; width: 1px; height: 1px; }',
                    id, pixels.width);
    },

    html: function(){
      var ret = format('<p id="{0}">', id);
      for(var y=0; y < pixels.height; y++){
        for(var x=0; x < pixels.width; x++){
          ret += format('<i style="background: #{0}"></i>', pixels.get(x, y).hex());
        }
      }
      return ret + '</p>';
    }
  };
};
