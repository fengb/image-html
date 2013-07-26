var util = module.exports = {
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
    var count = {};
    function add(value){
      count[value] = (count[value] || 0) + 1;
    }
    if(array){
      for(var i=0; i < array.length; i++){
        add(array[i]);
      }
    }

    return {
      count: count,
      add: add,
      sortByMostFrequent: function(){
        return util.objToArray(this.count).sort(function(a, b){
          return a[1] < b[1] ?  1 :
                 a[1] > b[1] ? -1 : 0;
        });
      }
    };
  },

  objToArray: function(obj){
    var array = [];
    for(var key in obj){
      array.push([key, obj[key]]);
    }
    return array;
  },

  memoize: function(func){
    var cache = {};
    return function(){
      var key = [].join.apply(arguments);
      if(!cache[key]){
        cache[key] = func.apply(this, arguments);
      }
      return cache[key];
    };
  },

  generator: function(chars){
    var index = 0;
    return function(){
      if(index < chars.length){
        return chars[index++];
      }
      return null;
    };
  },

  endlessGenerator: function(chars){
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
