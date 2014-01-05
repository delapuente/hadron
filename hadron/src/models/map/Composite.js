define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      SceneNode = require('hadron/models/map/SceneNode'),
      _LocalNode = require('hadron/models/map/_LocalNode'),
      Render = require('hadron/models/map/CompositeRender');

  function Composite() {
    S.theObject(this)
      .has('_nodes', []),
    ;
    SceneNode.apply(this, arguments);
  }
  S.theClass(Composite).inheritsFrom(SceneNode);

  Composite.prototype.render = Render;

  Composite.prototype.getPrimitives = function () {
    var nodePrimitives, offset,
        primitives = [];

    for (var i = 0, node; node = this._nodes[i]; i++) {
      offset = node.position;
      nodePrimitives = node.getPrimitives();
      primitives.concat(nodePrimitives.map(function fixOffset(primitive) {
        /* TODO: Assert this is a _Primitive? */
        if (primitive.position === undefined) {
          primitive.position = [0, 0, 0];
        }
        else {
          primitive.position[0] += offset[0];
          primitive.position[1] += offset[1];
          primitive.position[2] += offset[2];
        }
      }));
    }
    
    return primitives;
  };

  Composite.prototype.addObject = function(sceneNode, position) {
    var localNode = new _LocalNode(sceneNode, position, this);
    this._nodes.push(localNode);
  };

  return Composite;
});
