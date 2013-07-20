!function(){
  var input = {
    upload: document.getElementById('upload'),
    format: document.getElementById('format')
  };
  var img = {
    display: document.getElementById('display'),
    raw: document.getElementById('raw')
  };
  var output = {
    css: document.getElementById('css'),
    html: document.getElementById('html')
  };

  ImageHtml.formats().forEach(function(format){
    input.format.options.add(new Option(format, format));
  });

  input.upload.onchange = function(){
    var reader = new FileReader();
    reader.onload = function(evt){
      img.display.src = evt.target.result;
      img.raw.src = evt.target.result;
    }
    reader.readAsDataURL(input.upload.files[0]);
  };

  input.format.onchange = img.raw.onload = function(evt){
    var out = ImageHtml.convert(img.raw, 'a', input.format.value);
    output.css.textContent = out.css();
    output.html.textContent = out.html();
    output.css.disabled = false;
    output.html.disabled = false;
  };

  output.css.onclick = output.html.onclick = function(evt){
    evt.target.select();
  }
}();
