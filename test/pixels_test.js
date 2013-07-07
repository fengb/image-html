describe('Pixels', function(){
  describe('fromDom', function(){
    before(function(done){
      var self = this;

      /* Image is 5 vertical lines at 5px each: black-red-green-blue-white */
      var base64 = 'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAMAAAC6sdbXAAAAGF'+
                   'BMVEUAAAAAAP8A/wD/AAD////AAAAAAAMAAACUibU7AAAAEUlE'+
                   'QVQImWNgYGZiZGHAQQIAAu4AMx4cLS4AAAAASUVORK5CYII=';
      Pixels.fromBase64async(base64, function(pixels){
        self.inst = pixels;
        done();
      });
    });

    it('is 5px by 5px', function(){
      expect(this.inst.width).to.be(5);
      expect(this.inst.height).to.be(5);
    });

    describe('#get()', function(){
      it('is Color.hex("000000") for x=0', function(){
        for(var y=0; y < this.inst.height; y++){
          expect(this.inst.get(0, y)).to.eql(Color.hex('000000'));
        }
      });

      it('is Color.hex("ff0000") for x=1', function(){
        for(var y=0; y < this.inst.height; y++){
          expect(this.inst.get(1, y)).to.eql(Color.hex('ff0000'));
        }
      });

      it('is Color.hex("00ff00") for x=2', function(){
        for(var y=0; y < this.inst.height; y++){
          expect(this.inst.get(2, y)).to.eql(Color.hex('00ff00'));
        }
      });

      it('is Color.hex("0000ff") for x=3', function(){
        for(var y=0; y < this.inst.height; y++){
          expect(this.inst.get(3, y)).to.eql(Color.hex('0000ff'));
        }
      });

      it('is Color.hex("ffffff") for x=4', function(){
        for(var y=0; y < this.inst.height; y++){
          expect(this.inst.get(4, y)).to.eql(Color.hex('ffffff'));
        }
      });
    });
  });
});
