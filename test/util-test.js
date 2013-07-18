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
    expect(counter).to.have.property('this');
    expect(counter).to.have.property('is');
    expect(counter).to.have.property('sparta');
  });

  it('has each count to be total values', function(){
    var counter = util.counter(['alpha', 'beta', 'alpha']);
    expect(counter).to.have.property('alpha', 2);
    expect(counter).to.have.property('beta', 1);
  });
});

describe('objToArray()', function(){
  it('converts to array', function(){
    var array = util.objToArray({a: 1, b: 2}).sort();
    expect(array[0]).to.eql(['a', 1]);
    expect(array[1]).to.eql(['b', 2]);
  });
});

describe('generator()', function(){
  it('iterates through chars', function(){
    var generator = util.generator('abcdefg');
    expect(generator()).to.equal('a');
    expect(generator()).to.equal('b');
    expect(generator()).to.equal('c');
    expect(generator()).to.equal('d');
    expect(generator()).to.equal('e');
    expect(generator()).to.equal('f');
    expect(generator()).to.equal('g');
  });

  it('appends chars if no more unique single chars', function(){
    var generator = util.generator('a');
    expect(generator()).to.equal('a');
    expect(generator()).to.equal('aa');
    expect(generator()).to.equal('aaa');
    expect(generator()).to.equal('aaaa');
  });

  it('does fancy combination of both', function(){
    var generator = util.generator('ab');
    expect(generator()).to.equal('a');
    expect(generator()).to.equal('b');
    expect(generator()).to.equal('aa');
    expect(generator()).to.equal('ba');
    expect(generator()).to.equal('ab');
    expect(generator()).to.equal('bb');
  });
});
