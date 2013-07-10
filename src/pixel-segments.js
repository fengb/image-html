function PixelSegments(pixels){
  var rows = [];
  for(var row=0; row < pixels.rows; row++){
    rows[row] = [];
    var last = {value: null};
    for(var col=0; col < pixels.cols; col++){
      if(pixels[row][col].equals(last.value)){
        last.length++;
      } else{
        last = {length: 1, value: pixels[row][col]};
        rows[row].push(last);
      }
    }
  }
  return rows;
}
