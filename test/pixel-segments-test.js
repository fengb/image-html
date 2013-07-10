describe('PixelSegments()', function(){
  it('converts sequential elements to single segments', function(){
    var pixels = Pixels.stub(['000000 000000 111111 111111 111111']);
    var segments = PixelSegments(pixels);
    expect(segments[0][0].length).to.eql(2);
    expect(segments[0][0].value).to.eql(Color.hex('000000'));
    expect(segments[0][1].length).to.eql(3);
    expect(segments[0][1].value).to.eql(Color.hex('111111'));
  });
});
