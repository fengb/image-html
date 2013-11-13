var expect = require('expect.js');
var Color = require('../src/color');


describe('Color', function(){
  describe('.rgba()', function(){
    before(function(){
      this.color = Color.rgba(1, 2, 3, 0.5);
    });

    it('has correct rgba values', function(){
      expect(this.color.rgba()).to.eql([1, 2, 3, 0.5]);
    });

    it('has the correct css value', function(){
      expect(this.color.css()).to.equal('#010203');
    });
  });

  describe('inverse', function(){
    it('is rgba', function(){
      expect(Color.rgba(2, 1, 3, 0.1).rgba()).to.eql([2, 1, 3, 0.1]);
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
