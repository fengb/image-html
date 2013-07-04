describe('ImagePixels', function(){
  describe('fromDom', function(){
    before(function(done){
      var self = this;

      img = new Image();
      /* Image is 5 vertical lines at 5px each: black-red-green-blue-white */
      img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAM'+
                'AAAC6sdbXAAAAGFBMVEUAAAAAAP8A/wD/AAD////AAAAAAAMAAACUibU7'+
                'AAAAEUlEQVQImWNgYGZiZGHAQQIAAu4AMx4cLS4AAAAASUVORK5CYII=';
      img.onload = function(){
        self.inst = ImagePixels.fromDom(img);
        done();
      };
    });

    it('is 5px by 5px', function(){
      expect(this.inst.width).to.be(5);
      expect(this.inst.height).to.be(5);
    });

    describe('#pixel()', function(){
      it('is Color.str("000000") for x=0', function(){
        for(var y=0; y < this.inst.height; y++){
          expect(this.inst.pixel(0, y)).to.eql(Color.str('000000'));
        }
      });

      it('is Color.str("ff0000") for x=1', function(){
        for(var y=0; y < this.inst.height; y++){
          expect(this.inst.pixel(1, y)).to.eql(Color.str('ff0000'));
        }
      });

      it('is Color.str("00ff00") for x=2', function(){
        for(var y=0; y < this.inst.height; y++){
          expect(this.inst.pixel(2, y)).to.eql(Color.str('00ff00'));
        }
      });

      it('is Color.str("0000ff") for x=3', function(){
        for(var y=0; y < this.inst.height; y++){
          expect(this.inst.pixel(3, y)).to.eql(Color.str('0000ff'));
        }
      });

      it('is Color.str("ffffff") for x=4', function(){
        for(var y=0; y < this.inst.height; y++){
          expect(this.inst.pixel(4, y)).to.eql(Color.str('ffffff'));
        }
      });
    });
  });
});
