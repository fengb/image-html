module.exports = {
  format: function() {
    var regexes = [];
    for(var i=0; i < 10; i++) {
      regexes[i] = new RegExp('\\{' + i + '\\}', 'gm');
    }

    return function() {
      var s = arguments[0];
      for(var i=1; i < arguments.length; i++) {
        s = s.replace(regexes[i-1], arguments[i]);
      }

      return s;
    };
  }(),

  counter: function(array){
    var ret = {};
    for(var i=0; i < array.length; i++){
      var val = array[i];
      ret[val] = (ret[val] || 0) + 1;
    }
    return ret;
  },

  generator: function(chars){
    var indexes = [];

    return function(){
      var i = 0;
      while(true){
        if(i >= indexes.length){
          indexes.push(0);
          break;
        }

        if(++indexes[i] < chars.length){
          break;
        }

        indexes[i++] = 0;
      }
      return indexes.map(function(i){ return chars[i]; }).join('');
    };
  }
};
