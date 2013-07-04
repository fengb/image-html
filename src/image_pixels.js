var Color = {
  rgb: function(r, g, b){
    return [r, g, b];
  }
};

function ImagePixels(domImage){
  if(!(this instanceof ImagePixels)) {
    return new ImagePixels(domImage);
  }

  this.width = domImage.width;
  this.height = domImage.height;

  var canvas = document.createElement('canvas');
  canvas.width = this.width;
  canvas.height = this.height;
  ctx = canvas.getContext('2d');
  ctx.drawImage(domImage, 0, 0);
  this._raw = ctx.getImageData(0, 0, this.width, this.height).data;
}

ImagePixels.prototype.pixel = function(x, y){
  var i = (x + y*this.height) * 4;
  var r = this._raw[i];
  var g = this._raw[i+1];
  var b = this._raw[i+2];
  var a = this._raw[i+3];
  return Color.rgb(r,g,b);
};
