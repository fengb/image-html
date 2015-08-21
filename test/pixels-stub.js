var expect = require('expect.js');
var Pixels = module.exports = require('../src/pixels');
var Color = require('../src/color');


Pixels.stub = function(arrayHexes){
  var matrix = [];
  for(var row=0; row < arrayHexes.length; row++){
    matrix[row] = [];
    var hexes = arrayHexes[row].split(' ');
    for(var col=0; col < hexes.length; col++){
      matrix[row][col] = Color.hex(hexes[col]);
    }
  }
  return Pixels(matrix);
};


describe('Pixels.stub()', function(){
  before(function(){
    this.inst = Pixels.stub([
      '000000 111111 222222',
      '333333 444444 555555'
    ]);
  });

  it('has correct dimensions', function(){
    expect(this.inst.cols).to.equal(3);
    expect(this.inst.rows).to.equal(2);
  });

  it('gets correct values', function(){
    expect(this.inst[1][0]).to.eql(Color.hex('333333'));
    expect(this.inst[0][2]).to.eql(Color.hex('222222'));
  });
});
