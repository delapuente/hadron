define(function(require) {
  'use strict';

  var T = require('hadron/toolkit'),
      S = require('hadron/scaffolding'),
      Render = require('hadron/Render'),
      PrimitiveGraph = require('hadron/lib/structures/PrimitiveGraph');

  var gfx = require('hadron/gfx/GraphicSystem');

  function IsometricMapRender(isometricMap) {
    Render.apply(this, arguments);
    isometricMap.getRenderSubmodels = this.getRenderSubmodels;
  }
  S.theClass(IsometricMapRender).inheritsFrom(Render);

  IsometricMapRender.prototype.getRenderSubmodels = function() {
    var primitivesGraph, sortedPrimitives,
        primitives = [];

    for (var i = 0, l = this._objects.length; i < l; i++) {
      primitives.concat(this._objects[i].getPrimitives());
    }

    primitivesGraph = new PrimitiveGraph(primitives);
    primitivesGraph.sort();

    return primitivesGraph.primitives;
  };

  return IsometricMapRender;
});
