var expect = require('expect.js');
var HtmlGenerator = require('../../src/formats/pi-04').HtmlGenerator;


describe('Pi04.HtmlGenerator', function(){
  describe('.styles()', function(){
    it('outputs all relevant class definitions', function(){
      var gen = new HtmlGenerator([{top: '0', left: '0'},
                                   {top: '0', left: '0'}]);
      var styles = gen.styles('i');
      expect(styles[0]).to.match(/^i \.[a-z] { (top|left): 0 }$/);
      expect(styles[1]).to.match(/^i \.[a-z] { (top|left): 0 }$/);
      expect(styles[0]).to.not.equal(styles[1]);
    });
  });

  describe('.elementFor()', function(){
    it('keeps single styles as styles', function(){
      var gen = new HtmlGenerator([{left: '0', top: '0'}]);
      expect(gen.elementFor({left: '0'})).to.equal('<i style="left: 0"></i>');
      expect(gen.elementFor({top: '0'})).to.equal('<i style="top: 0"></i>');
    });

    it('groups styles into unique styles', function(){
      var gen = new HtmlGenerator([{top: '0', left: '0'},
                                   {top: '0', left: '0'}]);
      var out = {
        top: gen.elementFor({top: '0'}),
        left: gen.elementFor({left: '0'})
      };
      expect(out.top).to.match(/^<i class="[a-z]"><\/i>$/);
      expect(out.left).to.match(/^<i class="[a-z]"><\/i>$/);
      expect(out.top).to.not.equal(out.left);
    });

    it('has consistent outputs', function(){
      var gen = new HtmlGenerator([{top: '0', left: '0'},
                                   {top: '0'}]);
      expect(gen.elementFor({top: '0'})).
          to.equal(gen.elementFor({top: '0'}));
      expect(gen.elementFor({left: '0'})).
          to.equal(gen.elementFor({left: '0'}));
    });

    it('combines outputs', function(){
      var gen = new HtmlGenerator([{top: '0', left: '0'},
                                   {top: '0', right: '0'},
                                   {bottom: '0', left: '0'}]);
      expect(gen.elementFor({top: '0', left: '0'})).
          to.match(/^<i class="[a-z] [a-z]"><\/i>$/);
      expect(gen.elementFor({top: '0', right: '0'})).
          to.match(/^<i class="[a-z]" style="right: 0"><\/i>$/);
      expect(gen.elementFor({bottom: '0', right: '0'})).
          to.equal('<i style="bottom: 0; right: 0"></i>');
    });
  });
});
