define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      SceneNode = require('hadron/models/map/SceneNode'),
      _Primitive = require('hadron/models/map/_Primitive'),
      Render = require('hadron/models/map/geometries/GeometryRender');
      
  function Geometry() {
    SceneNode.apply(this, arguments);
  }
  S.theClass(Geometry).inheritsFrom(SceneNode);

  Geometry.prototype.getPrimitives = function () {
    return [new _Primitive(this)];
  };
  
  Geometry.prototype.render = Render;

  return Geometry;
});
