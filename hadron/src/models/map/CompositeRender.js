define(function(require) {
  'use strict';

  var T = require('hadron/toolkit'),
      S = require('hadron/scaffolding'),
      Render = require('hadron/Render'),
      Graph = require('hadron/lib/structures/Graph'),
      WorldMetrics = require('hadron/models/visualization/WorldMetrics');

  function CompositeRender(composite) {
    Render.apply(this, arguments);
    composite.getRenderSubmodels = this.getRenderSubmodels;
  }
  S.theClass(CompositeRender).inheritsFrom(Render);

  /* TODO: Can we use the Composite model to optimize the graph creation?
  We can assert any node inside the same object always keep the 
  relationships between them unaltered upon movement. */ 
  CompositeRender.prototype.getRenderSubmodels = function () {
    var primitives = this.getPrimitives();
    var primitiveGraph = new Graph(primitives, isBehind);
    
    primitiveGraph.sort();
    return primitiveGraph.nodes;
  };
  
  var metrics = new WorldMetrics(100);
  function isBehind(primitiveA, primitiveB) {
    return metrics.getOverlapped(primitiveA, primitiveB) === primitiveA;
  }

  return CompositeRender;
});
