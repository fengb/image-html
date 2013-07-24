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

  describe('.valuesFor()', function(){
    it('keeps single styles as styles', function(){
      var gen = new HtmlGenerator([{left: '0', top: '0'}]);
      expect(gen.valuesFor({left: '0'}).styles).to.equal('left: 0');
      expect(gen.valuesFor({top: '0'}).styles).to.equal('top: 0');
      expect(gen.valuesFor({top: '0', left: '0'}).styles).to.equal('top: 0; left: 0');
    });

    it('groups styles into unique classes', function(){
      var gen = new HtmlGenerator([{top: '0', left: '0'},
                                   {top: '0', left: '0'}]);
      var out = {
        top: gen.valuesFor({top: '0'}),
        left: gen.valuesFor({left: '0'})
      };
      expect(out.top.classes).to.match(/^[a-z]$/);
      expect(out.left.classes).to.match(/^[a-z]$/);
      expect(out.top.classes).to.not.equal(out.left.classes);
    });

    it('has consistent outputs', function(){
      var gen = new HtmlGenerator([{top: '0', left: '0'},
                                   {top: '0'}]);
      expect(gen.valuesFor({top: '0'})).
          to.eql(gen.valuesFor({top: '0'}));
      expect(gen.valuesFor({left: '0'})).
          to.eql(gen.valuesFor({left: '0'}));
    });

    it('combines outputs', function(){
      var gen = new HtmlGenerator([{top: '0', left: '0'},
                                   {top: '0', right: '0'}]);
      var out = {
        topleft: gen.valuesFor({top: '0', left: '0'}),
        topright: gen.valuesFor({top: '0', right: '0'})
      };
      expect(out.topleft.classes).to.match(/^[a-z]$/);
      expect(out.topleft.classes).to.equal(out.topright.classes);

      expect(out.topleft.styles).to.equal('left: 0');
      expect(out.topright.styles).to.equal('right: 0');
    });
  });
});
