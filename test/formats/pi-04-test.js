var expect = require('expect.js');
var CssClasser = require('../../src/formats/pi-04').CssClasser;


describe('Pi04.CssClasser', function(){
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

  describe('.elementFor()', function(){
    it('keeps single styles as styles', function(){
      var classer = new CssClasser([{left: '0', top: '0'}]);
      expect(classer.elementFor({left: '0'})).to.equal('<i style="left: 0"></i>');
      expect(classer.elementFor({top: '0'})).to.equal('<i style="top: 0"></i>');
    });

    it('groups styles into unique classes', function(){
      var classer = new CssClasser([{top: '0', left: '0'},
                                    {top: '0', left: '0'}]);
      var out = {
        top: classer.elementFor({top: '0'}),
        left: classer.elementFor({left: '0'})
      };
      expect(out.top).to.match(/^<i class="[a-z]"><\/i>$/);
      expect(out.left).to.match(/^<i class="[a-z]"><\/i>$/);
      expect(out.top).to.not.equal(out.left);
    });

    it('has consistent outputs', function(){
      var classer = new CssClasser([{top: '0', left: '0'},
                                    {top: '0'}]);
      expect(classer.elementFor({top: '0'})).
          to.equal(classer.elementFor({top: '0'}));
      expect(classer.elementFor({left: '0'})).
          to.equal(classer.elementFor({left: '0'}));
    });

    it('combines outputs', function(){
      var classer = new CssClasser([{top: '0', left: '0'},
                                    {top: '0', right: '0'},
                                    {bottom: '0', left: '0'}]);
      expect(classer.elementFor({top: '0', left: '0'})).
          to.match(/^<i class="[a-z] [a-z]"><\/i>$/);
      expect(classer.elementFor({top: '0', right: '0'})).
          to.match(/^<i class="[a-z]" style="right: 0"><\/i>$/);
      expect(classer.elementFor({bottom: '0', right: '0'})).
          to.equal('<i style="bottom: 0; right: 0"></i>');
    });
  });
});
