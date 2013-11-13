var Color = module.exports = function(r, g, b, a){
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
};

Color.prototype.equals = function(that){
  return this.constructor === (that && that.constructor) &&
         this.r === that.r &&
         this.g === that.g &&
         this.b === that.b;
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
  return '#' + this.hex();
};

Color.prototype.hex = function(){
  return hexify(this.r) + hexify(this.g) + hexify(this.b);
};

Color.rgb = function(r, g, b){
  return new Color(r, g, b, 1);
};

Color.rgba = function(r, g, b, a){
  return new Color(r, g, b, a);
};

Color.hex = function(hex){
  return new Color(parseInt(hex.substring(0, 2), 16),
                   parseInt(hex.substring(2, 4), 16),
                   parseInt(hex.substring(4, 6), 16));
};
