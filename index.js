var fs = require('fs');
var ImageHtml = module.exports = require('./src/image-html');
var Image = require('canvas-browserify').Image;

ImageHtml.convertFile = function(filename, id, format, callback){
  var data = fs.readFile(filename, function(err, data){
    if(err){
      throw err;
    }

    ImageHtml.convertData(data, id, format, callback);
  });
};

