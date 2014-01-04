define(function(require) {
  'use strict';

  var T = require('hadron/toolkit'),
      S = require('hadron/scaffolding'),
      Model = require('hadron/Model'),
      Geometry = require('hadron/models/map/geometries/MapObject');

  function MapObject(type, position) {
    S.theObject(this)
      .has('type', type)
      .has('position', [position[0], position[1], position[2]]);
    ;
    Model.apply(this, arguments);
  }
  S.theClass(MapObject).inheritsFrom(Model);
  
  MapObject.prototype.isPrimitive = function () {
    return this.type instanceof Geometry;
  };

  return MapObject;
});
