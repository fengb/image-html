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

  describe('.defaultTag', function(){
    it('is shortest of the tags', function(){
      var fmt = Pi04.Formatter({
        tags: {
          'iamlong': [],
          'iamlonger': [],
          'short': []
        }
      });
      expect(fmt.defaultTag).to.equal('short');
    });
  });

  describe('.styles()', function(){
    it('outputs all relevant class definitions', function(){
      var styles = this.fmt.styles('prepend');
      expect(styles.sort()).to.eql([
        'prepend * { float: left; height: 1px; vertical-align: baseline; margin: 0; padding: 0 }',
        'prepend *:before { content: "" }',
        'prepend *:after { content: "" }',
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

    it('uses defaultTag when tag not found', function(){
      this.fmt.defaultTag = 'default';
      expect(this.fmt.valuesFor(['top: 3', 'left: 3']).tag).to.equal('default');
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

    it('combines outputs', function(){
      var out = {
        tagClass:   this.fmt.valuesFor(['top: 1', 'left: 2']),
        tagStyle:   this.fmt.valuesFor(['top: 1', 'left: 3']),
        classStyle: this.fmt.valuesFor(['top: 2', 'left: 3'])
      };

      expect(out.tagClass.tag).to.equal('b');
      expect(out.tagClass.classes).to.equal('bar');
      expect(out.tagStyle.tag).to.equal('b');
      expect(out.tagStyle.styles).to.equal('left: 3');
      expect(out.classStyle.classes).to.equal('foo');
      expect(out.classStyle.styles).to.equal('left: 3');
    });
  });
});
