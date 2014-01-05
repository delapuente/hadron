define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Composite = require('hadron/models/map/Composite'),
      _LocalNode = require('hadron/models/map/_LocalNode'),
      Render = require('hadron/models/map/TexturedRender');

  function Textured() {
    Composite.apply(this, arguments);
  }
  S.theClass(Textured).inheritsFrom(Composite);

  Textured.prototype.render = Render;

  return Textured;
});
