define(function(require) {
  'use strict';

  var T = require('hadron/toolkit'),
      S = require('hadron/scaffolding'),
      Geometry = require('hadron/models/map/geometries/Geometry');
      
  function Cuboid(lengthX, lengthY, lengthZ) {
    this._dimensions = [lengthX, lengthY, lengthZ];
    Geometry.apply(this, arguments);
  }
  S.theClass(Cuboid).inheritsFrom(Geometry);
  
  return Cuboid;
});
