var Color = require('./color');

var Pixels = module.exports = function(colorsMatrix){
  this.rows = colorsMatrix.length;
  this.cols = colorsMatrix[0].length;

  for(var row=0; row < this.rows; row++){
    this[row] = colorsMatrix[row];
  }
};

var createCanvas;
if(typeof document != 'undefined'){
  createCanvas = function(width, height){
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
  };
} else {
  createCanvas = function(width, height){
    var Canvas = require('canvas');
    return new Canvas(width, height);
  };
}

Pixels.fromDom = function(domImage){
  var canvas = createCanvas(domImage.width, domImage.height);
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
      colors[row][col] = Color.rgb(r,g,b,a);
    }
  }

  return new Pixels(colors);
};
