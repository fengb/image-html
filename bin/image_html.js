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

console.log(
page.evaluate(function(imageBase64){
  return imageBase64;
}, imageBase64));

phantom.exit();
