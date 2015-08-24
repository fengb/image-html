var fs = require('fs');
var ImageHtml = module.exports = require('./src/image-html');
var Image = require('canvas-browserify').Image;

ImageHtml.convertFile = function(filename, id, format, callback){
  if(typeof format === 'function'){
    callback = format;
    format = null;
  }

  var data = fs.readFile(filename, function(err, data){
    if(err){
      throw err;
    }

    callback(ImageHtml.convertData(data, id, format));
  });
};

