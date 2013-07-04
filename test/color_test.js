describe('Color', function(){
  describe('.rgb()', function(){
    before(function(){
      this.r = 1;
      this.g = 2;
      this.b = 3;
      this.color = Color.rgb(this.r, this.g, this.b);
    });

    it('has correct rgb values', function(){
      expect(this.color.r).to.equal(this.r);
      expect(this.color.g).to.equal(this.g);
      expect(this.color.b).to.equal(this.b);
    });
  });
});
