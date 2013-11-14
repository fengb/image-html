!function(){
  var input = {
    upload: document.getElementById('upload'),
    format: document.getElementById('format'),
    imageId: document.getElementById('image-id'),
  };
  var img = {
    display: document.getElementById('display'),
    raw: document.getElementById('raw')
  };
  var output = {
    css: document.getElementById('css'),
    html: document.getElementById('html')
  };
  var desc = {
    css: document.getElementById('css-desc'),
    html: document.getElementById('html-desc')
  };

  ImageHtml.formats().forEach(function(format, index){
    input.format.add(new Option(format, format));
    input.format.selectedIndex = index;
  });

  input.upload.onchange = function(){
    var reader = new FileReader();
    reader.onload = function(evt){
      img.display.src = evt.target.result;
      img.raw.src = evt.target.result;
    }
    reader.readAsDataURL(input.upload.files[0]);
  };

  input.imageId.onchange = input.format.onchange = img.raw.onload = function(evt){
    var out = ImageHtml.convert(img.raw, input.imageId.value, input.format.value);
    output.css.textContent = out.css();
    output.html.textContent = out.html();
    desc.css.textContent = '— ' + output.css.textContent.length + ' bytes';
    desc.html.textContent = '— ' + output.html.textContent.length + ' bytes';
    output.css.disabled = false;
    output.html.disabled = false;
  };

  output.css.onclick = output.html.onclick = function(evt){
    evt.target.select();
  }
}();
