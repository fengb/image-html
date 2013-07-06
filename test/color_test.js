describe('Color', function(){
  describe('inverse', function(){
    it('is hex', function(){
      expect(Color.hex('123456').hex()).to.equal('123456');
    });
  });

  describe('.rgb()', function(){
    before(function(){
      this.color = Color.rgb(1, 2, 3);
    });

    it('has correct rgb values', function(){
      expect(this.color.r).to.equal(1);
      expect(this.color.g).to.equal(2);
      expect(this.color.b).to.equal(3);
    });

    it('has the correct hex value', function(){
      expect(this.color.hex()).to.equal('010203');
    });
  });

  describe('.hex()', function(){
    it('is equivalent to rgb', function(){
      var color = Color.hex('010203');
      var rgb = Color.rgb(1, 2, 3);
      expect(color).to.eql(rgb);
    });
  });
});
