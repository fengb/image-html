var ImageHtml = {
  run: function(pixels, id){
    return {
      css: function(){
        return format('#{0} { border-collapse: collapse; }' +
                      '#{0} * { width: 1px; height: 1px; }', id);
      },

      html: function(){
        var ret = format('<table id="{0}">', id);
        for(var x=0; x < pixels.width; x++){
          ret += '<tr>';
          for(var y=0; y < pixels.height; y++){
            ret += format('<td style="background: #{0}"></td>', pixels.get(x, y).hex());
          }
          ret += '</tr>';
        }
        return ret + '</table>';
      }
    };
  }
};
