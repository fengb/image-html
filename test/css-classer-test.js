var expect = require('expect.js');
var CssClasser = require('../src/css-classer');


describe('CssClasser', function(){
  describe('.attrsFor()', function(){
    it('keeps single styles as styles', function(){
      var classer = new CssClasser(['left: 0', 'top: 0', 'left: 1px']);
      expect(classer.attrsFor(['left: 0'])).to.equal('style="left: 0"');
      expect(classer.attrsFor(['top: 0'])).to.equal('style="top: 0"');
      expect(classer.attrsFor(['left: 1px'])).to.equal('style="left: 1px"');
    });

    it('groups styles into unique classes', function(){
      var classer = new CssClasser(['top: 0', 'top: 0',
                                    'left: 0', 'left: 0']);
      var out = {
        top: classer.attrsFor(['top: 0']),
        left: classer.attrsFor(['left: 0'])
      };
      expect(out.top).to.match(/^class="[a-z]"$/);
      expect(out.left).to.match(/^class="[a-z]"$/);
      expect(out.top).to.not.equal(out.left);
    });

    it('has consistent outputs', function(){
      var classer = new CssClasser(['top: 0', 'top: 0',
                                    'left: 0']);
      expect(classer.attrsFor(['top: 0'])).
          to.equal(classer.attrsFor(['top: 0']));
      expect(classer.attrsFor(['left: 0'])).
          to.equal(classer.attrsFor(['left: 0']));
    });

    it('combines outputs', function(){
      var classer = new CssClasser(['top: 0', 'top: 0',
                                    'left: 0', 'left: 0',
                                    'right: 0',
                                    'bottom: 0']);
      expect(classer.attrsFor(['top: 0', 'left: 0'])).
          to.match(/^class="[a-z] [a-z]"$/);
      expect(classer.attrsFor(['top: 0', 'right: 0'])).
          to.match(/^class="[a-z]" style="right: 0"$/);
      expect(classer.attrsFor(['bottom: 0', 'right: 0'])).
          to.equal('style="bottom: 0; right: 0"');
    });
  });
});
