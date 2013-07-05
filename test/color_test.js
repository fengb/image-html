describe('Color', function(){
  describe('.rgb()', function(){
    it('has correct rgb values', function(){
      var color = Color.rgb(1, 2, 3);
      expect(color.r).to.equal(1);
      expect(color.g).to.equal(2);
      expect(color.b).to.equal(3);
    });
  });

  describe('.hex()', function(){
    it('is equivalent to rgb', function(){
      var color = Color.hex('010203');
      var rgb = Color.rgb(1, 2, 3);
      expect(color).to.eql(rgb);
    });

    it('has correct rgb values', function(){
      var color = Color.hex('010203');
      expect(color.r).to.equal(1);
      expect(color.g).to.equal(2);
      expect(color.b).to.equal(3);
    });
  });
});
