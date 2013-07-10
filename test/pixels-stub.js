Pixels.stub = function(arrayHexes){
  var raw = [];
  for(var y=0; y < arrayHexes.length; y++){
    var hexes = arrayHexes[y].split(' ');
    for(var x=0; x < hexes.length; x++){
      if(raw[x] === undefined){
        raw[x] = [];
      }
      raw[x][y] = Color.hex(hexes[x]);
    }
  }
  return new Pixels(raw);
};


describe('Pixels.stub()', function(){
  before(function(){
    this.inst = Pixels.stub([
      '000000 111111 222222',
      '333333 444444 555555'
    ]);
  });

  it('has correct dimensions', function(){
    expect(this.inst.width).to.equal(3);
    expect(this.inst.height).to.equal(2);
  });

  it('gets correct values', function(){
    expect(this.inst.get(0, 1)).to.eql(Color.hex('333333'));
    expect(this.inst.get(2, 0)).to.eql(Color.hex('222222'));
  });
});
