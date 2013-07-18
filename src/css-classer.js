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

CssClasser.prototype.attrsFor = function(searchStyles){
  var classes = [];
  var styles = [];
  for(var i=0; i < searchStyles.length; i++){
    var style = searchStyles[i];
    if(this.classes[style]){
      classes.push(this.classes[style]);
    } else {
      styles.push(style);
    }
  }

  var ret = [];
  if(classes.length > 0){
    ret.push(util.format('class="{0}"', classes.join(' ')));
  }
  if(styles.length > 0){
    ret.push(util.format('style="{0}"', styles.join('; ')));
  }
  return ret.join(' ');
};
