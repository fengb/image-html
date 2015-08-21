var Color = require('./color');
var Canvas = require('canvas-browserify');

var Pixels = module.exports = function(colorsMatrix){
  colorsMatrix.rows = colorsMatrix.length;
  colorsMatrix.cols = colorsMatrix[0].length;
  return colorsMatrix;
};

Pixels.fromImage = function(domImage){
  var canvas = new Canvas(domImage.width, domImage.height);
  var ctx = canvas.getContext('2d');
  ctx.drawImage(domImage, 0, 0);
  var imageData = ctx.getImageData(0, 0, domImage.width, domImage.height).data;

  var colors = [];
  for(var row=0; row < domImage.height; row++){
    colors[row] = [];
    for(var col=0; col < domImage.width; col++){
      var i = (row*domImage.width + col) * 4;
      var r = imageData[i];
      var g = imageData[i+1];
      var b = imageData[i+2];
      var a = imageData[i+3];
      colors[row][col] = Color.rgba(r,g,b,a);
    }
  }

  return Pixels(colors);
};
