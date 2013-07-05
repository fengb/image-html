var Color = {
  rgb: function(r, g, b){
    return {
      r: r,
      g: g,
      b: b
    };
  },

  hex: function(raw){
    return {
      r: parseInt(raw.substring(0, 2), 16),
      g: parseInt(raw.substring(2, 4), 16),
      b: parseInt(raw.substring(4, 6), 16)
    };
  }
};
