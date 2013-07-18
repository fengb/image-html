var expect = require('expect.js');
var CssClasser = require('../src/css-classer');


describe('CssClasser', function(){
  describe('.attrsFor()', function(){
    it('keeps single styles as styles', function(){
      var classer = new CssClasser(['left: 0', 'top: 0', 'left: 1px']);
      expect(classer.attrsFor('left: 0')).to.equal('styles="left: 0"');
      expect(classer.attrsFor('top: 0')).to.equal('styles="top: 0"');
      expect(classer.attrsFor('left: 1px')).to.equal('styles="left: 1px"');
    });

    it('groups styles into unique classes', function(){
      var classer = new CssClasser(['top: 0', 'top: 0', 'left: 0', 'left: 0']);
      var out = {
        top: classer.attrsFor('top: 0'),
        left: classer.attrsFor('left: 0')
      };
      expect(out.top).to.match(/^class="[a-z]*"/);
      expect(out.left).to.match(/^class="[a-z]*"/);
      expect(out.top).to.not.equal(out.left);
    });

    it('has consistent outputs', function(){
      var classer = new CssClasser(['top: 0', 'top: 0', 'left: 0']);
      expect(classer.attrsFor('top: 0')).to.equal(classer.attrsFor('top: 0'));
      expect(classer.attrsFor('left: 0')).to.equal(classer.attrsFor('left: 0'));
    });
  });
});
