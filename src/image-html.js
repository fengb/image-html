var ImageHtml = window.ImageHtml = {
  outputs: {},
  dom: function(image, id, output){
    output = output || 'table';
    var pixels = Pixels.fromDom(image);
    return ImageHtml.outputs[output](pixels, id);
  }
};
