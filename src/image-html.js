var Pixels = require('./pixels');
var formats = {
  'html1': require('./formats/html1'),
  'html2': require('./formats/html2'),
  'html3': require('./formats/html3'),
  'html4': require('./formats/html4'),
  'js1': require('./formats/js1')
};

var ImageHtml = module.exports = {
  formats: function(){
    return Object.keys(formats);
  },

  convert: function(image, id, format){
    format = format || 'html4';
    var pixels = Pixels.fromImage(image);
    return formats[format](pixels, id);
  }
};
