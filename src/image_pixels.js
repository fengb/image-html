function ImagePixels(colorsMatrix){
  this._raw = colorsMatrix;
  this.width = colorsMatrix.length;
  this.height = colorsMatrix[0].length;
}

ImagePixels.fromDom = function(domImage){
  var canvas = document.createElement('canvas');
  canvas.width = domImage.width;
  canvas.height = domImage.height;
  var ctx = canvas.getContext('2d');
  ctx.drawImage(domImage, 0, 0);
  var imageData = ctx.getImageData(0, 0, domImage.width, domImage.height).data;

  var colors = [];
  for(var x=0; x < domImage.width; x++){
    colors[x] = [];
    for(var y=0; y < domImage.height; y++){
      var i = (x + y*domImage.height) * 4;
      var r = imageData[i];
      var g = imageData[i+1];
      var b = imageData[i+2];
      var a = imageData[i+3];
      colors[x][y] = Color.rgb(r,g,b);
    }
  }

  return new ImagePixels(colors);
};

ImagePixels.prototype.pixel = function(x, y){
  return this._raw[x][y];
};
