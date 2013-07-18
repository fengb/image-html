var util = require('./util');
var CssClasser = module.exports = function(styles){
  var counter = util.counter(styles);
  var generator = util.generator('abcdefghijklmnopqrstuvwxyz');

  this._classes = {};
  for(var key in counter){
    var val = counter[key];
    if(counter[key] > 1){
      this._classes[key] = generator();
    }
  }
};

CssClasser.prototype.classes = function(prepend){
  var ret = [];
  for(var c in this._classes){
    ret.push(util.format('{0} .{1} { {2} }', prepend, this._classes[c], c));
  }
  return ret;
};

CssClasser.prototype.attrsFor = function(searchStyles){
  var classes = [];
  var styles = [];
  for(var i=0; i < searchStyles.length; i++){
    var style = searchStyles[i];
    if(this._classes[style]){
      classes.push(this._classes[style]);
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
