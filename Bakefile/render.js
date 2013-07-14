#!/usr/bin/env phantomjs


var sys = require('system');
var page = require('webpage').create();

var opts = function(args){
  var opts = {name: args[0], args: []};
  for(var i=1; i < args.length; i++){
    if(args[i][0] == '-'){
      switch(args[i]) {
        case '--viewport':
          opts.viewport = args[++i];
          break;
        default:
          console.log('Unknown switch: ' + args[i]);
          phantom.exit();
      }
    } else{
      opts.args.push(args[i]);
    }
  }
  return opts;
}(sys.args);

if(opts.viewport){
  var dimensions = opts.viewport.split('x');
  page.viewportSize = {width: dimensions[0], height: dimensions[1]};
}

page.open(opts.args[0], function(){
  page.render(opts.args[1]);
  phantom.exit();
});
