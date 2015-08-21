var util = require('./util');


var ALPHA_OPAQUE = 255;

var Color = module.exports = function(r, g, b, a){
  if(a == null){
    a = ALPHA_OPAQUE;
  }

  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
};

Color.prototype.equals = function(that){
  return this.constructor === (that && that.constructor) &&
         this.r === that.r &&
         this.g === that.g &&
         this.b === that.b &&
         this.a === that.a;
};

Color.prototype.rgb = function(){
  return [this.r, this.g, this.b];
};

Color.prototype.rgba = function(){
  return [this.r, this.g, this.b, this.a];
};

function hexify(num){
  var ret = num.toString(16);
  return ret.length == 1 ? '0' + ret : ret;
}

Color.prototype.css = function(){
  switch(this.a){
    case ALPHA_OPAQUE:
      return '#' + this.hex();
    case 0:
      return 'transparent';
    default:
      return util.format('rgba({0},{1},{2},{3})', this.r, this.g, this.b, util.round(this.a / ALPHA_OPAQUE, 3));
  }
};

Color.prototype.hex = function(){
  if(this.a === ALPHA_OPAQUE){
    return hexify(this.r) + hexify(this.g) + hexify(this.b);
  } else {
    return hexify(this.r) + hexify(this.g) + hexify(this.b) + hexify(this.a);
  }
};

Color.rgb = function(r, g, b){
  return new Color(r, g, b);
};

Color.rgba = function(r, g, b, a){
  return new Color(r, g, b, a);
};

Color.hex = function(hex){
  var r = parseInt(hex.substr(0, 2), 16);
  var g = parseInt(hex.substr(2, 2), 16);
  var b = parseInt(hex.substr(4, 2), 16);
  var a;

  if(hex.length > 6){
    a = parseInt(hex.substr(6, 2), 16);
  }
  return Color.rgba(r, g, b, a);
};
