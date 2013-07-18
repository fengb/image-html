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
  }
};
