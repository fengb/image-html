var Pixels = require('./pixels');
var formats = {
  'pi-01': require('./formats/pi-01'),
  'pi-02': require('./formats/pi-02'),
  'pi-03': require('./formats/pi-03'),
  'pi-04': require('./formats/pi-04')
};

var ImageHtml = module.exports = {
  formats: function(){
    return Object.keys(formats);
  },

  convert: function(image, id, format){
    format = format || 'pi-04';
    var pixels = Pixels.fromImage(image);
    return formats[format](pixels, id);
  }
};
