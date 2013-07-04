describe('ImagePixels', function(){
  before(function(done){
    var self = this;

    img = new Image();
    /* Image is 5 vertical lines at 5px each: black-red-green-blue-white */
    img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAM'+
              'AAAC6sdbXAAAAGFBMVEUAAAAAAP8A/wD/AAD////AAAAAAAMAAACUibU7'+
              'AAAAEUlEQVQImWNgYGZiZGHAQQIAAu4AMx4cLS4AAAAASUVORK5CYII=';
    img.onload = function(){
      self.inst = ImagePixels(img);
      done();
    };
  });

  it('is 5px by 5px', function(){
    expect(this.inst.width).to.be(5);
    expect(this.inst.height).to.be(5);
  });

  describe('#pixel()', function(){
    it('is "rgb(0,0,0)" for x=0', function(){
      for(var y=0; y < this.inst.height; y++){
        expect(this.inst.pixel(0, y)).to.eql(Color.rgb(0, 0, 0));
      }
    });

    it('is "rgb(255,0,0)" for x=1', function(){
      for(var y=0; y < this.inst.height; y++){
        expect(this.inst.pixel(1, y)).to.eql(Color.rgb(255, 0, 0));
      }
    });

    it('is "rgb(0,255,0)" for x=2', function(){
      for(var y=0; y < this.inst.height; y++){
        expect(this.inst.pixel(2, y)).to.eql(Color.rgb(0, 255, 0));
      }
    });

    it('is "rgb(0,0,255)" for x=3', function(){
      for(var y=0; y < this.inst.height; y++){
        expect(this.inst.pixel(3, y)).to.eql(Color.rgb(0, 0, 255));
      }
    });

    it('is "rgb(255,255,255)" for x=4', function(){
      for(var y=0; y < this.inst.height; y++){
        expect(this.inst.pixel(4, y)).to.eql(Color.rgb(255, 255, 255));
      }
    });
  });
});
