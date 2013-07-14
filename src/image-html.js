var ImageHtml = window.ImageHtml = {
  outputs: function(){
    var func = ImageHtml.outputs;
    var keys = [];
    for(var key in func){
      if(func.hasOwnProperty(key)){
        keys.push(key);
      }
    }
    return keys;
  },

  dom: function(image, id, output){
    output = output || 'segments';
    var pixels = Pixels.fromDom(image);
    return ImageHtml.outputs[output](pixels, id);
  }
};
