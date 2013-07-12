#!/usr/bin/env phantomjs


var sys = require('system');
var page = require('webpage').create();

page.open(sys.args[1], function(){
  page.render(sys.args[2]);
  phantom.exit();
});
