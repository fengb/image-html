var Pixels = require('./pixels');
var formats = {
  baseline: require('./formats/baseline'),
  segments: require('./formats/segments')
};

var ImageHtml = module.exports = {
  formats: function(){
    return Object.keys(formats);
  },

  dom: function(image, id, format){
    format = format || 'segments';
    var pixels = Pixels.fromDom(image);
    return formats[format](pixels, id);
  }
};
