define(function(require) {
  'use strict';

  var T = require('hadron/toolkit'),
      S = require('hadron/scaffolding');

  function _LocalObject(type, position, owner) {
    var wrapper = Object.create(type); 
    S.the(wrapper)
      .has('position', [position[0], position[1], position[2]])
      .has('owner', owner)
    ;
    return wrapper;
  }
  
  return _LocalObject;
});
