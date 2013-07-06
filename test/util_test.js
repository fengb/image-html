describe('format()', function() {
  it('based on position', function() {
    var out = format('This is testing {0} for {1}.', 'foo', 'bar');
    expect(out).to.equal('This is testing foo for bar.');
  });

  it('same value correctly', function() {
    var out = format('{0} {0} {1} {0}', 'foo', 'bar');
    expect(out).to.equal('foo foo bar foo');
  });
});
