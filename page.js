(function(){
  var gzipWorker = window.gzipWorker = new Worker('gzip-worker.js');
  gzipWorker.onmessage = function(event){
    var gzipDisplay = ' (' + event.data.body.length + ' gzipped)';
    document.getElementById(event.data.id).textContent += gzipDisplay;
  };

  var input = {
    upload: document.getElementById('upload'),
    format: document.getElementById('format'),
    imageId: document.getElementById('image-id'),
  };
  var preview = {
    css: document.getElementById('preview-css'),
    html: document.getElementById('preview-html'),
    js: document.getElementById('preview-js'),
  };
  var output = {
    css: document.getElementById('css'),
    html: document.getElementById('html'),
    js: document.getElementById('js'),
  };
  var desc = {
    css: document.getElementById('css-desc'),
    html: document.getElementById('html-desc'),
    js: document.getElementById('js-desc'),
  };

  ImageHtml.formats().forEach(function(format, index){
    input.format.add(new Option(format, format));
    input.format.selectedIndex = index;
  });

  input.upload.onchange = function(){
    var reader = new FileReader();
    reader.onload = function(evt){
      imageData = evt.target.result;
      updateImage();
    }
    reader.readAsDataURL(input.upload.files[0]);
  };

  output.css.onclick = output.html.onclick = output.js.onclick = function(evt){
    evt.target.select();
  }

  var imageData = 'example.png';
  function updateImage(){
    ImageHtml.convertData(imageData, input.imageId.value, input.format.value, function(out){
      output.css.textContent = out.css;
      output.html.textContent = out.html;
      output.js.textContent = out.js;

      desc.css.textContent = '— ' + output.css.textContent.length + ' bytes';
      desc.html.textContent = '— ' + output.html.textContent.length + ' bytes';
      desc.js.textContent = '— ' + output.js.textContent.length + ' bytes';

      gzipWorker.postMessage({ id: desc.css.id, body: output.css.textContent });
      gzipWorker.postMessage({ id: desc.html.id, body: output.html.textContent });
      gzipWorker.postMessage({ id: desc.js.id, body: output.js.textContent });

      setTimeout(function(){
        preview.css.textContent = out.css;
        preview.html.innerHTML = out.html;
        if(out.js){
          eval(out.js);
        }
      }, 100);
    });
  };

  input.imageId.onchange = input.format.onchange = updateImage;

  updateImage();
})();
