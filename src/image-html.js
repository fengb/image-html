var Pixels = require('./pixels');
var formats = {
  'pi-01': require('./formats/pi-01'),
  'pi-02': require('./formats/pi-02')
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
