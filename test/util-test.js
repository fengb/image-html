var expect = require('expect.js');
var util = require('../src/util');


describe('format()', function(){
  it('based on position', function(){
    var out = util.format('This is testing {0} for {1}.', 'foo', 'bar');
    expect(out).to.equal('This is testing foo for bar.');
  });

  it('same value correctly', function(){
    var out = util.format('{0} {0} {1} {0}', 'foo', 'bar');
    expect(out).to.equal('foo foo bar foo');
  });
});


describe('counter()', function(){
  it('has each element', function(){
    var counter = util.counter(['this', 'is', 'sparta']);
    expect(counter.count).to.have.property('this');
    expect(counter.count).to.have.property('is');
    expect(counter.count).to.have.property('sparta');
  });

  it('has each count to be total values', function(){
    var counter = util.counter(['alpha', 'beta', 'alpha']);
    expect(counter.count).to.have.property('alpha', 2);
    expect(counter.count).to.have.property('beta', 1);
  });

  it('can .add() elements', function(){
    var counter = util.counter();
    counter.add('alpha');
    counter.add('alpha');
    expect(counter.count).to.have.property('alpha', 2);
  });

  it('.sortByMostFrequent()', function(){
    var counter = util.counter(['one', 'one', 'two']);
    var sorted = counter.sortByMostFrequent();
    expect(sorted[0]).to.eql(['one', 2]);
    expect(sorted[1]).to.eql(['two', 1]);
  });
});

describe('objToArray()', function(){
  it('converts to array', function(){
    var array = util.objToArray({a: 1, b: 2}).sort();
    expect(array[0]).to.eql(['a', 1]);
    expect(array[1]).to.eql(['b', 2]);
  });
});

describe('memoize()', function(){
  describe('for functions', function(){
    before(function(){
      this.memoed = util.memoize(function(a, b, c){
        return arguments;
      });
    });

    it('caches no args', function(){
      var ret = this.memoed();
      expect(ret).to.eql([]);
      expect(ret).to.equal(this.memoed());
    });

    it('caches args', function(){
      var ret = this.memoed(1, 2, 3);
      expect(ret).to.eql([1, 2, 3]);
      expect(ret).to.equal(this.memoed(1, 2, 3));
    });

    it('caches differently based on arguments', function(){
      expect(this.memoed(1, 2, 3)).to.eql([1, 2, 3]);
      expect(this.memoed(4, 5, 6)).to.eql([4, 5, 6]);
    });
  });
});

describe('endlessGenerator()', function(){
  it('iterates through chars', function(){
    var generator = util.endlessGenerator('abcdefg');
    expect(generator()).to.equal('a');
    expect(generator()).to.equal('b');
    expect(generator()).to.equal('c');
    expect(generator()).to.equal('d');
    expect(generator()).to.equal('e');
    expect(generator()).to.equal('f');
    expect(generator()).to.equal('g');
  });

  it('appends chars if no more unique single chars', function(){
    var generator = util.endlessGenerator('a');
    expect(generator()).to.equal('a');
    expect(generator()).to.equal('aa');
    expect(generator()).to.equal('aaa');
    expect(generator()).to.equal('aaaa');
  });

  it('does fancy combination of both', function(){
    var generator = util.endlessGenerator('ab');
    expect(generator()).to.equal('a');
    expect(generator()).to.equal('b');
    expect(generator()).to.equal('aa');
    expect(generator()).to.equal('ba');
    expect(generator()).to.equal('ab');
    expect(generator()).to.equal('bb');
  });
});
