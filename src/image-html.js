var Pixels = require('./pixels');
var outputs = {
  baseline: require('./outputs/baseline'),
  segments: require('./outputs/segments')
};

var ImageHtml = module.exports = {
  outputs: function(){
    var keys = [];
    for(var key in outputs){
      if(outputs.hasOwnProperty(key)){
        keys.push(key);
      }
    }
    return keys.sort();
  },

  dom: function(image, id, output){
    output = output || 'segments';
    var pixels = Pixels.fromDom(image);
    return outputs[output](pixels, id);
  }
};
