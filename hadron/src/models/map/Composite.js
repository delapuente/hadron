define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      SceneNode = require('hadron/models/map/SceneNode'),
      _LocalNode = require('hadron/models/map/_LocalNode'),
      Render = require('hadron/models/map/CompositeRender');

  function Composite() {
    S.theObject(this)
      .has('_nodes', [])
    ;
    SceneNode.apply(this, arguments);
  }
  S.theClass(Composite).inheritsFrom(SceneNode);

  Composite.prototype.render = Render;

  Composite.prototype.getPrimitives = function () {
    var nodePrimitives, offset,
        primitives = [];

    for (var i = 0, node; node = this._nodes[i]; i++) {
      nodePrimitives = node.getPrimitives();
      if (node instanceof Composite) {
        offset = node.position;
        nodePrimitives = nodePrimitives.map(function fixOffset(primitive) {
          /* TODO: Assert this is a _Primitive? */
          primitive.position = [
            primitive.position[0] + offset[0],
            primitive.position[1] + offset[1],
            primitive.position[2] + offset[2]
          ];
          return primitive;
        });
      }
      primitives.push.apply(primitives, nodePrimitives);
    }
    
    return primitives;
  };

  Composite.prototype.addObject = function(sceneNode, position) {
    var localNode = new _LocalNode(sceneNode, position, this);
    this._nodes.push(localNode);
    return localNode;
  };

  return Composite;
});
