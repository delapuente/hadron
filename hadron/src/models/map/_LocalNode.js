define(function(require) {
  'use strict';

  var T = require('hadron/toolkit'),
      S = require('hadron/scaffolding');

  function _LocalObject(type, position, owner) {
    var wrapper = Object.create(type); 
    S.the(wrapper)
      .has('owner', owner)
    ;
    wrapper.position = [position[0], position[1], position[2]];
    return wrapper;
  }
  
  return _LocalObject;
});
