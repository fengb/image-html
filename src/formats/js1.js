var format = require('../util.js').format;


function jsOutput(){
  function subFromHexBlob(hexBlob, subpixel, def){
    var blobStart = subpixel * 2;
    if(hexBlob.length <= blobStart){
      return def;
    }
    return parseInt(hexBlob.substr(blobStart, 2), 16);
  }

  var canvases = document.querySelectorAll('canvas[data-image-html]');
  for(var i = 0; i < canvases.length; i++){
    var canvas = canvases[i];
    var pixels = JSON.parse(canvas.getAttribute('data-image-html'));

    var ctx = canvas.getContext('2d');
    var pixelImage = ctx.createImageData(1,1);

    for(var row=0; row < canvas.height; row++) {
      var colPixels = pixels[row].split(',');
      for(var col=0; col < canvas.width; col++) {
        var hexBlob = colPixels[col];
        pixelImage.data[0] = subFromHexBlob(hexBlob, 0);
        pixelImage.data[1] = subFromHexBlob(hexBlob, 1);
        pixelImage.data[2] = subFromHexBlob(hexBlob, 2);
        pixelImage.data[3] = subFromHexBlob(hexBlob, 3, 255);
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
      var rgbaPixels = pixels.map(function(row){
        var hexes = row.map(function(col){
          return col.hex();
        });
        return hexes.join(',');
      });

      return format("<canvas width='{0}' height='{1}' data-image-html='{2}'></canvas>",
                    pixels.cols, pixels.rows, JSON.stringify(rgbaPixels));
    },

    js: function(){
      return format('({0})()', jsOutput.toString());
    }
  };
};
