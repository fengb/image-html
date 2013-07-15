var expect = require('expect.js');
var ImageHtml = require('../src/image-html');


describe('ImageHtml', function(){
  describe('.outputs', function(){
    it('returns the keys', function(){
      expect(ImageHtml.outputs()).to.eql(['baseline', 'segments']);
    });
  });
});
