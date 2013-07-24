var expect = require('expect.js');
var HtmlGenerator = require('../../src/formats/pi-04').HtmlGenerator;


describe('Pi04.HtmlGenerator', function(){
  describe('.testable.classes', function(){
    it('converts styles into classes', function(){
      var gen = new HtmlGenerator([{top: '0'},
                                   {top: '0'}]);
      expect(gen.testable.classes['top: 0']).to.match(/^[a-z]$/);
    });

    it('does not convert single styles', function(){
      var gen = new HtmlGenerator([{top: '0'}]);
      expect(gen.testable.classes).to.not.have.property(['top: 0']);
    });

    it('uses unique classes', function(){
      var gen = new HtmlGenerator([{top: '0', left: '0'},
                                   {top: '0', left: '0'}]);
      expect(gen.testable.classes['top: 0']).
        to.not.equal(gen.testable.classes['left: 0']);
    });
  });

  describe('.testable.commonStyles()', function(){
    it('outputs common styles by value', function(){
      var gen = new HtmlGenerator([{top: '0', left: '1'},
                                   {top: '0', left: '1'}]);
      expect(gen.testable.commonStyles('top')).to.eql(['0']);
      expect(gen.testable.commonStyles('left')).to.eql(['1']);
    });

    it('ignores value count of 1', function(){
      var gen = new HtmlGenerator([{top: '0', left: '1'}]);
      expect(gen.testable.commonStyles('top')).to.eql([]);
      expect(gen.testable.commonStyles('left')).to.eql([]);
    });

    it('orders by most often to least often', function(){
      var gen = new HtmlGenerator([{top: '0', left: '3'},
                                   {top: '0', left: '1'},
                                   {top: '2', left: '3'},
                                   {top: '2', left: '1'},
                                   {top: '2', left: '3'}]);
      expect(gen.testable.commonStyles('top')).to.eql(['2', '0']);
      expect(gen.testable.commonStyles('left')).to.eql(['3', '1']);
    });
  });

  describe('.styles()', function(){
    it('outputs all relevant class definitions', function(){
      var gen = new HtmlGenerator([{top: '0', left: '0'},
                                   {top: '0', left: '0'}]);
      var styles = gen.styles('o');
      expect(styles[0]).to.equal('o * { display: inline-block; }');
      expect(styles[1]).to.match(/^o \.[a-z] { (top|left): 0 }$/);
      expect(styles[2]).to.match(/^o \.[a-z] { (top|left): 0 }$/);
      expect(styles[1]).to.not.equal(styles[2]);
    });
  });

  describe('.valuesFor()', function(){
    it('keeps single styles as styles', function(){
      var gen = new HtmlGenerator([{left: '0', top: '0'}]);
      expect(gen.valuesFor({left: '0'}).styles).to.equal('left: 0');
      expect(gen.valuesFor({top: '0'}).styles).to.equal('top: 0');
      expect(gen.valuesFor({top: '0', left: '0'}).styles).to.equal('top: 0; left: 0');
    });

    it('groups styles into classes', function(){
      var gen = new HtmlGenerator([]);
      gen.testable.classes['top: 0'] = 'wat';
      expect(gen.valuesFor({top: '0'}).classes).to.equal('wat');
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
