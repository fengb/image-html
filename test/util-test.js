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
