define(function(require) {
  'use strict';

  var T = require('hadron/toolkit'),
      S = require('hadron/scaffolding');

  function _Primitive(localObject) {
    /* TODO: Assert we are augmenting a _LocalObject before returning the
    _Primitive. */
    return Object.create(localObject);
  }
  
  return _Primitive;
});
