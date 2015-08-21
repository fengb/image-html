var format = require('../util.js').format;


function jsOutput(){
  var canvases = document.querySelectorAll('canvas[data-image-html]');
  for(var i = 0; i < canvases.length; i++){
    var canvas = canvases[i];
    var data = JSON.parse(canvas.getAttribute('data-image-html'));
    canvas.width = data.cols;
    canvas.height = data.rows;

    var ctx = canvas.getContext('2d');
    var pixelImage = ctx.createImageData(1,1);

    for(var row=0; row < data.rows; row++) {
      for(var col=0; col < data.cols; col++) {
        var rgb = data.pixels[row][col];
        pixelImage.data[0] = rgb[0];
        pixelImage.data[1] = rgb[1];
        pixelImage.data[2] = rgb[2];
        pixelImage.data[3] = rgb[3] * 255;
        ctx.putImageData(pixelImage, col, row);
      }
    }
  }
}


module.exports = function(pixels, id){
  return {
    css: function(){
      return 'canvas[data-image-html] { vertical-align: top }';
    },

    html: function(){
      return format("<canvas data-image-html='{0}'></canvas>", JSON.stringify({
        rows: pixels.rows,
        cols: pixels.cols,
        pixels: pixels.map(function(row){
          return row.map(function(col){
            return col.rgba();
          });
        })
      }));
    },

    js: function(){
      return format('({0})()', jsOutput.toString());
    }
  };
};
