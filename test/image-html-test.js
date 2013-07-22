var expect = require('expect.js');
var fs = require('fs');
var ImageHtml = require('../src/image-html');


describe('ImageHtml', function(){
  describe('.formats', function(){
    it('returns the keys', function(){
      var files = fs.readdirSync(__dirname + '/../src/formats').map(function(f){
        return f.replace(/\.js/, '');
      });
      expect(ImageHtml.formats()).to.eql(files);
    });
  });
});
