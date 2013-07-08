#!/usr/bin/env phantomjs


var fs = require('fs');
var sys = require('system');
var page = require('webpage').create();


var file = fs.open(sys.args[1], 'rb');
var imageBase64 = btoa(file.read());
file.close();


fs.list('src').forEach(function(filename){
  var path = 'src/' + filename;
  if(fs.isFile(path)){
    page.injectJs(path);
  }
});


page.evaluate(function(imageBase64){
  Pixels.fromBase64async(imageBase64, function(pixels){
    var out = ImageHtml.run(pixels, '123');
    window.output = {
      html: out.html()
    };
  });
}, imageBase64);


setInterval(function(){
  var output = page.evaluate(function(){
    return window.output;
  });

  if(output) {
    console.log(output.html);
    phantom.exit();
  }
}, 100);
