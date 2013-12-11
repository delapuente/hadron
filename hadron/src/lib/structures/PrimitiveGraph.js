define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding');

  function PrimitiveGraph(primitives) {
    S.theObject(this)
      .has('_graph', {})
    ;
    this.primitives = primitives;
    this.buildGraph();
  }

  PrimitiveGraph.prototype.buildGraph = function() {
    var graph = this._graph,
        primitives = this.primitives, lastIndex = primitives.length - 1;

    // XXX: the graph is stored as a reversed adjacency matrix
    for (var i = lastIndex, primitive; primitive = primitives[i]; i--) {
      for (var j = lastIndex, another; another = primitives[j]; j--) {
        if (j == i) continue;
        if (another.isBehind(primitive)) {
          if (!graph[primitive.id])
            graph[primitive.id] = {};

          graph[primitive.id][another.id] = another;
        }
      }
    }
  };

  // Based on http://en.wikipedia.org/wiki/Topological_sorting
  // depth first search algorithm
  PrimitiveGraph.prototype.sort = function() {
    var sorted = [],
        graph = this._graph,
        primitives = this.primitives,
        lastIndex = primitives.length - 1;

    for (var i = lastIndex, primitive; primitive = primitives[i]; i--) {
      primitive.__visited__ = false;
    }

    for (var i = lastIndex, primitive; primitive = primitives[i]; i--) {
      if (primitive.__visited__) continue;
      visit(primitive);
    }

    function visit(primitive) {
      if (!primitive.__visited__) {
        primitive.__visited__ = 'inprogress'; // XXX: not used at the moment
        for (var adjacent in graph[primitive.id]) {
          visit(graph[primitive.id][adjacent]);
        }
        sorted.push(primitive)
        primitive.__visited__ = true;
      }
    }

    this.primitives = sorted;
  };

  return PrimitiveGraph;
});
