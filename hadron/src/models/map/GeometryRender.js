define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Render = require('hadron/Render');
      
  function GeometryRender(geometry) {
    Render.apply(this, arguments);
  }
  S.theClass(GeometryRender).inheritsFrom(Render);

  GeometryRender.prototype.render = function (primitive, interpolationValue) {
    // TODO: Assert `geometry` is wrapped by _Primitive before delegating
    this.delegateToRender(primitive.owner, interpolationValue, primitive);
  };
  return GeometryRender;
});
