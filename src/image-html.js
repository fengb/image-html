var Image = require('canvas-browserify').Image;
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
    var output = formats[format](pixels, id);

    output.page = function(){
      return [
        '<!DOCTYPE html>',
        '<html>',
        '<head>',
        '<style>',
        output.css,
        '</style>',
        '</head>',
        '<body style="margin:0">',
        output.html,
        '</body>',
        '<script>',
        output.js,
        '</script>',
        '</html>'
      ].join('\n');
    };

    return output;
  },

  convertData: function(data, id, format, callback){
    if(typeof format === 'function'){
      callback = format;
      format = null;
    }

    var img = new Image();
    img.onload = function(){
      var output = ImageHtml.convert(img, id, format);
      callback(output);
    };
    img.src = data;
  }
};
