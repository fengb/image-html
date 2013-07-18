var util = require('./util');
var CssClasser = module.exports = function(styles){
  var counter = util.counter(styles);
  var generator = util.generator('abcdefghijklmnopqrstuvwxyz');

  this.classes = {};
  for(var key in counter){
    var val = counter[key];
    if(counter[key] > 1){
      this.classes[key] = generator();
    }
  }
};

CssClasser.prototype.attrsFor = function(style){
  if(this.classes[style]){
    return util.format('class="{0}"', this.classes[style]);
  } else {
    return util.format('styles="{0}"', style);
  }
};
