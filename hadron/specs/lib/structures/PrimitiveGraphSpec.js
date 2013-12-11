(function() {
  'use strict';

  var context = newContext();

  function PrimitiveMock(id, behindList) {
    this.id = id;
    this.isBehind = function(primitive) {
      return behindList.indexOf(primitive.id) > -1;
    };
  }

  // A sorting is a topological ordering if for every directed edge uv from
  // vertex u to vertex v, u comes before v in the ordering.
  function toBeTopologicalOrdering() {
    var actual = this.actual, l = actual.length;
    var notText = this.isNot ? ' not' : '';
    this.message = function() {
      return 'Expected' + JSON.stringify(actual) + notText +
             ' to be a topological ordering.';
    };

    for (var i = 0; i < l; i++) {
      for (var j = 0; j < l; j++) {
        if (i === j) continue;
        if (actual[i].isBehind(actual[j])) {
          if (actual.indexOf(actual[j]) <= i) {
            return false;
          }
        }
      }
    }
    return true;
  }

  context(['hadron/lib/structures/PrimitiveGraph'], function(PrimitiveGraph) {
    describe('PrimitiveGraph instances', function() {
      var n2 = new PrimitiveMock(2, []),
          n3 = new PrimitiveMock(3, [8, 10]),
          n5 = new PrimitiveMock(5, [11]),
          n7 = new PrimitiveMock(7, [11, 8]),
          n8 = new PrimitiveMock(8, [9]),
          n9 = new PrimitiveMock(9, []),
          n10 = new PrimitiveMock(10, []),
          n11 = new PrimitiveMock(11, [2, 9, 10]);

      var primitives = [n2, n3, n5, n7, n8, n9, n10, n11];

      // Note this is the reversed adjacency matrix cause it is needed this way
      // for depth-first search topological order.
      var expectedAdjacencyMatrix = {
        2: {11: n11},
        8: {7: n7, 3: n3},
        9: {8: n8, 11: n11},
        10: {11: n11, 3: n3},
        11: {7: n7, 5: n5}
      };

      beforeEach(function() {
        this.addMatchers({
          toBeTopologicalOrdering: toBeTopologicalOrdering
        })
      });

      it('when created, construct an adjacency matrix in `_graph`', function() {
        var primitivesGraph = new PrimitiveGraph(primitives);

        expect(primitivesGraph._graph).toEqual(expectedAdjacencyMatrix);
      });

      it('allows to obtain a topological sort, calling `sort()` method',
      function() {
        var primitivesGraph = new PrimitiveGraph(primitives);
        primitivesGraph.sort();

        expect(primitivesGraph.primitives).toBeTopologicalOrdering();
      });
    });
  });

}()); 
