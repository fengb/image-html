importScripts('bower_components/pako/dist/pako_deflate.min.js');
onmessage = function(event){
  var gzipped = pako.gzip(event.data.body, { level: 2 })
  postMessage({ id: event.data.id, body: gzipped })
}
