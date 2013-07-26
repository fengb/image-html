var Pixels = require('./pixels');
var formats = {
  '01': require('./formats/01'),
  '02': require('./formats/02'),
  '03': require('./formats/03'),
  '04': require('./formats/04')
};

var ImageHtml = module.exports = {
  formats: function(){
    return Object.keys(formats);
  },

  convert: function(image, id, format){
    format = format || '04';
    var pixels = Pixels.fromImage(image);
    return formats[format](pixels, id);
  }
};
