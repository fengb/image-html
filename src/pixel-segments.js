function PixelSegments(pixels){
  var rows = [];
  for(var r=0; r < pixels.height; r++){
    rows[r] = [];
    var last = {value: null};
    for(var c=0; c < pixels.width; c++){
      if(pixels.get(c, r).equals(last.value)){
        last.length++;
      } else{
        last = {length: 1, value: pixels.get(c, r)};
        rows[r].push(last);
      }
    }
  }
  return rows;
}
