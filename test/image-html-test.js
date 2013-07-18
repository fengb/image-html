var expect = require('expect.js');
var ImageHtml = require('../src/image-html');


describe('ImageHtml', function(){
  describe('.formats', function(){
    it('returns the keys', function(){
      expect(ImageHtml.formats()).to.eql(['pi-01', 'pi-02']);
    });
  });
});
