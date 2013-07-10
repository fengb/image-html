describe('Pixels', function(){
  describe('fromDom', function(){
    before(function(done){
      var self = this;

      var img = new Image();
      img.onload = function(){
        self.inst = Pixels.fromDom(img);
        done();
      };
      /* Image is 5 vertical lines at 3px tall: black-red-green-blue-white */
      img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAADCAMAA'+
                                      'ABs6DXKAAAAGFBMVEUAAAAAAP8A/wD/AAD///'+
                                      '/AAAAAAAAAAACGPBrVAAAAEElEQVQImWNgYGZ'+
                                      'iZGFAIgEBDgAfrzCWxwAAAABJRU5ErkJggg==';
    });

    it('is 5px wide by 3px tall', function(){
      expect(this.inst.cols).to.be(5);
      expect(this.inst.rows).to.be(3);
    });

    describe('index', function(){
      [[0, '000000'],
       [1, 'ff0000'],
       [2, '00ff00'],
       [3, '0000ff'],
       [4, 'ffffff']].forEach(function(tup){
        var col = tup[0];
        var color = tup[1];
        [0, 1, 2].forEach(function(row){
          it(format('is Color.hex("{0}") for [{1}][{2}]', color, row, col), function(){
            expect(this.inst[row][col].hex()).to.eql(color);
          });
        });
      });
    });
  });
});
