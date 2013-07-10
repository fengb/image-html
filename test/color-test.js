describe('Color', function(){
  describe('.rgb()', function(){
    before(function(){
      this.color = Color.rgb(1, 2, 3);
    });

    it('has correct rgb values', function(){
      expect(this.color.rgb()).to.eql([1, 2, 3]);
    });

    it('has the correct hex value', function(){
      expect(this.color.hex()).to.equal('010203');
    });
  });

  describe('inverse', function(){
    it('is rgb', function(){
      expect(Color.rgb(2, 1, 3).rgb()).to.eql([2, 1, 3]);
    });

    it('is hex', function(){
      expect(Color.hex('123456').hex()).to.equal('123456');
    });
  });

  describe('#equals()', function(){
    before(function(){
      this.baseline = Color.rgb(9, 6, 3);
    });

    it('does not equals null', function(){
      expect(this.baseline.equals(null)).to.be(false);
    });

    it('equals self', function(){
      expect(this.baseline.equals(Color.rgb(9, 6, 3))).to.be(true);
    });

    it('equals hex equivalent', function(){
      expect(this.baseline.equals(Color.hex('090603'))).to.be(true);
    });
  });
});
