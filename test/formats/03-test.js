var expect = require('expect.js');
var CssClasser = require('../../src/formats/03').CssClasser;


describe('03.CssClasser', function(){
  describe('.classes()', function(){
    it('outputs all relevant class definitions', function(){
      var classer = new CssClasser([{top: '0', left: '0'},
                                    {top: '0', left: '0'}]);
      var classes = classer.classes('i');
      expect(classes[0]).to.match(/^i \.[a-z] { (top|left): 0 }$/);
      expect(classes[1]).to.match(/^i \.[a-z] { (top|left): 0 }$/);
      expect(classes[0]).to.not.equal(classes[1]);
    });
  });

  describe('.attrsFor()', function(){
    it('keeps single styles as styles', function(){
      var classer = new CssClasser([{left: '0', top: '0'}]);
      expect(classer.attrsFor({left: '0'})).to.equal('style="left: 0"');
      expect(classer.attrsFor({top: '0'})).to.equal('style="top: 0"');
    });

    it('groups styles into unique classes', function(){
      var classer = new CssClasser([{top: '0', left: '0'},
                                    {top: '0', left: '0'}]);
      var out = {
        top: classer.attrsFor({top: '0'}),
        left: classer.attrsFor({left: '0'})
      };
      expect(out.top).to.match(/^class="[a-z]"$/);
      expect(out.left).to.match(/^class="[a-z]"$/);
      expect(out.top).to.not.equal(out.left);
    });

    it('has consistent outputs', function(){
      var classer = new CssClasser([{top: '0', left: '0'},
                                    {top: '0'}]);
      expect(classer.attrsFor({top: '0'})).
          to.equal(classer.attrsFor({top: '0'}));
      expect(classer.attrsFor({left: '0'})).
          to.equal(classer.attrsFor({left: '0'}));
    });

    it('combines outputs', function(){
      var classer = new CssClasser([{top: '0', left: '0'},
                                    {top: '0', right: '0'},
                                    {bottom: '0', left: '0'}]);
      expect(classer.attrsFor({top: '0', left: '0'})).
          to.match(/^class="[a-z] [a-z]"$/);
      expect(classer.attrsFor({top: '0', right: '0'})).
          to.match(/^class="[a-z]" style="right: 0"$/);
      expect(classer.attrsFor({bottom: '0', right: '0'})).
          to.equal('style="bottom: 0; right: 0"');
    });
  });
});
