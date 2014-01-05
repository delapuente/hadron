define(function(require) {
  'use strict';

  var T = require('hadron/toolkit'),
      S = require('hadron/scaffolding'),
      Render = require('hadron/Render'),
      Graph = require('hadron/lib/structures/Graph'),
      WorldMetrics = require('hadron/models/visualization/WorldMetrics');

  var gfx = require('hadron/gfx/GraphicSystem');

  function TexturedRender(composite) {
    Render.apply(this, arguments);
  }
  S.theClass(TexturedRender).inheritsFrom(Render);

  TexturedRender.prototype.render =
  function (textured, interpolationValue, primitive) {
    // Only wireframes at the moment
    var drawer = gfx.drawer;
    drawer.save();
    drawer.drawCuboid(primitive);
    drawer.restore();  
  };

  return TexturedRender;
});
