define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      SceneNodeRender = require('hadron/models/map/SceneNodeRender');
      
  function GeometryRender(geometry) {
    SceneNodeRender.apply(this, arguments);
    geometry.getPrimitives = this.getPrimitives;
  }
  S.theClass(GeometryRender).inheritsFrom(SceneNodeRender);

  Geometry.prototype.render = function (geometry, interpolationValue) {
    // TODO: Assert `geometry` is wrapped by _Primitive before delegating
    geometry.owner.render(geometry.owner, interpolationValue, this);
  };
  return GeometryRender;
});
