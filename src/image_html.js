var ImageHtml = {
  run: function(pixels, id){
    return {
      css: function(){
        return format('#{0} { border-spacing: 0; }' +
                      '#{0} tr { height: 1px; }', id);
      },

      html: function(){
        var ret = format('<table id="{0}">', id);
        for(var y=0; y < pixels.height; y++){
          ret += '<tr>';
          for(var x=0; x < pixels.width; x++){
            ret += format('<td style="background: #{0}"></td>', pixels.get(x, y).hex());
          }
          ret += '</tr>';
        }
        return ret + '</table>';
      }
    };
  }
};
