var expect = require('expect.js');
var Pi04 = require('../../src/formats/pi-04');


describe('Pi04.Aggregator', function(){
  describe('.tags', function(){
    it('does nothing for single uses', function(){
      var agg = Pi04.Aggregator([{top: '0'}]);
      expect(agg.tags).to.eql([]);
    });

    it('groups multiple uses to one tag', function(){
      var agg = Pi04.Aggregator([{top: '0', left: '0'},
                                 {top: '0', left: '0'},
                                 {top: '0', left: '0'},
                                 {top: '0', right: '0'},
                                 {top: '0', right: '0'}]);
      expect(agg.tags.i).to.eql(['top: 0', 'left: 0']);
      expect(agg.tags.b).to.eql(['top: 0', 'right: 0']);
    });
  });

  describe('.classes', function(){
    it('converts styles into classes', function(){
      var agg = Pi04.Aggregator([{top: '0'},
                                 {top: '0'}]);
      expect(agg.classes['top: 0']).to.match(/^[a-z]$/);
    });

    it('does not convert single styles', function(){
      var agg = Pi04.Aggregator([{top: '0'}]);
      expect(agg.classes).to.not.have.property(['top: 0']);
    });

    it('uses unique classes', function(){
      var agg = Pi04.Aggregator([{top: '0', left: '0'},
                                 {top: '0', left: '0'}]);
      expect(agg.classes['top: 0']).to.not.equal(agg.classes['left: 0']);
    });
  });
});

describe('Pi04.Formatter', function(){
  before(function(){
    this.fmt = Pi04.Formatter({
      classes: {
        'top: 0': 'foo',
        'left: 0': 'bar',
      }
    });
  });

  describe('.styles()', function(){
    it('outputs all relevant class definitions', function(){
      var styles = this.fmt.styles('o');
      expect(styles.sort()).to.eql([
        'o * { display: inline-block }',
        'o .foo { top: 0 }',
        'o .bar { left: 0 }'
      ].sort());
    });
  });

  describe('.valuesFor()', function(){
    it('uses classes when possible', function(){
      expect(this.fmt.valuesFor({top: '0'}).classes).to.equal('foo');
      expect(this.fmt.valuesFor({left: '0'}).classes).to.equal('bar');
      expect(this.fmt.valuesFor({top: '0', left: '0'}).classes).to.equal('foo bar');
    });

    it('keeps styles when cannot find classes', function(){
      expect(this.fmt.valuesFor({left: '1'}).styles).to.equal('left: 1');
      expect(this.fmt.valuesFor({top: '1', left: '1'}).styles).to.equal('top: 1; left: 1');
    });

    it('combines outputs', function(){
      var topright = this.fmt.valuesFor({top: '0', right: '0'});
      expect(topright.classes).to.equal('foo');
      expect(topright.styles).to.equal('right: 0');
    });
  });
});
