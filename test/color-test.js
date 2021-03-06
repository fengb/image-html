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
  });

  describe('#css()', function(){
    it('is "#010203" for rgb(1, 2, 3)', function(){
      var color = Color.rgb(1, 2, 3);
      expect(color.css()).to.eql('#010203');
    });

    it('is "rgba(3,4,6,0.5)" for rgba(3, 4, 6, 127.5)', function(){
      var color = Color.rgba(3, 4, 6, 127.5);
      expect(color.css()).to.eql('rgba(3,4,6,0.5)');
    });

    it('is "transparent" for rgba(9, 8, 7, 0)', function(){
      var color = Color.rgba(9, 8, 7, 0);
      expect(color.css()).to.eql('transparent');
    });

    it('is "rgba(6,8,4,0.498)" for rgba(6, 8, 4, 127)', function(){
      var color = Color.rgba(6, 8, 4, 127);
      expect(color.css()).to.eql('rgba(6,8,4,0.498)');
    });
  });

  describe('inverse', function(){
    it('is rgba', function(){
      expect(Color.rgba(2, 1, 3, 0.1).rgba()).to.eql([2, 1, 3, 0.1]);
    });

    it('is hex', function(){
      expect(Color.hex('123456').hex()).to.equal('123456');
    });

    it('is hex + alpha', function(){
      expect(Color.hex('12345678').hex()).to.equal('12345678');
    });
  });

  describe('#equals()', function(){
    before(function(){
      this.baseline = Color.rgb(9, 6, 3);
    });

    it('does not equal null', function(){
      expect(this.baseline.equals(null)).to.be(false);
    });

    it('equals self', function(){
      expect(this.baseline.equals(Color.rgb(9, 6, 3))).to.be(true);
    });

    it('equals hex equivalent', function(){
      expect(this.baseline.equals(Color.hex('090603'))).to.be(true);
    });

    it('does not equal different alpha', function(){
      expect(this.baseline.equals(Color.rgba(9, 6, 3, 0.2))).to.be(false);
    });
  });
});
