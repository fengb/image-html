var expect = require('expect.js');
var Pi04 = require('../../src/formats/pi-04');


describe('Pi04.Aggregator', function(){
  describe('.tags', function(){
    it('does nothing for single uses', function(){
      var agg = Pi04.Aggregator([['top: 0']]);
      expect(agg.tags).to.eql([]);
    });

    it('groups multiple uses to one tag', function(){
      var agg = Pi04.Aggregator([['top: 0', 'left: 0'],
                                 ['top: 0', 'left: 0'],
                                 ['top: 0', 'left: 0'],
                                 ['top: 0', 'right: 0'],
                                 ['top: 0', 'right: 0']]);
      expect(agg.tags.i).to.eql(['top: 0', 'left: 0']);
      expect(agg.tags.b).to.eql(['top: 0', 'right: 0']);
    });
  });

  describe('.classes', function(){
    it('converts styles into classes', function(){
      var agg = Pi04.Aggregator([['top: 0'],
                                 ['top: 0']]);
      expect(agg.classes['top: 0']).to.match(/^[a-z]$/);
    });

    it('does not convert single styles', function(){
      var agg = Pi04.Aggregator([['top: 0']]);
      expect(agg.classes).to.not.have.property('top: 0');
    });

    it('uses unique classes', function(){
      var agg = Pi04.Aggregator([['top: 0', 'left: 0'],
                                 ['top: 0', 'left: 0']]);
      expect(agg.classes['top: 0']).to.not.equal(agg.classes['left: 0']);
    });
  });
});

describe('Pi04.Formatter', function(){
  before(function(){
    this.fmt = Pi04.Formatter({
      tags: {
        'i': ['top: 0', 'left: 0'],
        'b': ['top: 1', 'left: 1']
      },

      classes: {
        'top: 2': 'foo',
        'left: 2': 'bar',
      }
    });
  });

  describe('.styles()', function(){
    it('outputs all relevant class definitions', function(){
      var styles = this.fmt.styles('prepend');
      expect(styles.sort()).to.eql([
        'prepend * { display: inline-block; height: 1px }',
        'prepend i { top: 0; left: 0 }',
        'prepend b { top: 1; left: 1 }',
        'prepend .foo { top: 2 }',
        'prepend .bar { left: 2 }'
      ].sort());
    });
  });

  describe('.valuesFor()', function(){
    it('uses only tags when possible', function(){
      var out = [
        this.fmt.valuesFor(['top: 0', 'left: 0']),
        this.fmt.valuesFor(['top: 1', 'left: 1'])
      ];
      expect(out[0].tag).to.equal('i');
      expect(out[1].tag).to.equal('b');
      expect(out[0].classes).to.equal('');
      expect(out[1].classes).to.equal('');
      expect(out[0].styles).to.equal('');
      expect(out[1].styles).to.equal('');
    });

    it('uses classes when possible', function(){
      expect(this.fmt.valuesFor(['top: 2']).classes).to.equal('foo');
      expect(this.fmt.valuesFor(['left: 2']).classes).to.equal('bar');
      expect(this.fmt.valuesFor(['top: 2', 'left: 2']).classes).to.equal('foo bar');
    });

    it('keeps styles when cannot find classes', function(){
      expect(this.fmt.valuesFor(['left: 3']).styles).to.equal('left: 3');
      expect(this.fmt.valuesFor(['top: 3', 'left: 3']).styles).to.equal('top: 3; left: 3');
    });
  });
});
