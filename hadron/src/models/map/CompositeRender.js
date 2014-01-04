define(function(require) {
  'use strict';

  var T = require('hadron/toolkit'),
      S = require('hadron/scaffolding'),
      Render = require('hadron/Render'),
      Graph = require('hadron/lib/structures/Graph'),
      WorldMetrics = require('hadron/models/visualization/WorldMetrics');

  var gfx = require('hadron/gfx/GraphicSystem');

  function CompositeRender(composite) {
    Render.apply(this, arguments);
    composite.getRenderSubmodels = this.getRenderSubmodels;
    composite.getPrimitives = this.getPrimitives;
  }
  S.theClass(CompositeRender).inheritsFrom(Render);

  CompositeRender.prototype.getRenderSubmodels = function () {
    var primitives = this.getPrimitives();
    var primitiveGraph = new Graph(primitives, isBehind);
    
    primitiveGraph.sort();
    
    return primitiveGraph.primitives;
  };

  CompositeRender.prototype.getPrimitives = function () {
    var primitiveInPlace, auxPrimitives, offset,
        primitives = [];

    for (var i = 0, object; object = this._objects[i]; i++) {
      if (object.isPrimitive()) {
        primitiveInPlace = Object.create(object);
        primitives.push(primitiveInPlace); 
      }
      else {
        auxPrimitives = object.type.getPrimitives();
        offset = object.position;
        for (var j = 0, primitive; primitive = auxPrimitives[j]; j++) {
          primitive.position[0] += offset[0];
          primitive.position[1] += offset[1];
          primitive.position[2] += offset[2];
          primitives.push(primitive);
        }
      }
    }
    
    return primitives;
  };

  var isBehind(primitiveA, primitiveB) {
    return WorldMetrics.getOverlapped(primitiveA, primitiveB) === primitiveA;
  }

  return CompositeRender;
});
