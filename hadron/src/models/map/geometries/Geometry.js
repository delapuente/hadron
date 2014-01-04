define(function(require) {
  'use strict';

  var T = require('hadron/toolkit'),
      S = require('hadron/scaffolding'),
      IsometricEntity = require('hadron/models/map/IsometricEntity');
      
  function Geometry() {
    IsometricEntity.apply(this, arguments);
  }
  S.theClass(Geometry).inheritsFrom(IsometricEntity);
  
  return Geometry;
});
