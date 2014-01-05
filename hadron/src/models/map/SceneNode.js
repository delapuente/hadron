define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      Model = require('hadron/Model');

  function SceneNode() {
    Model.apply(this, arguments);
  }
  S.theClass(SceneNode).inheritsFrom(Model);

  SceneNode.prototype.getPrimitives = function () {
    // TODO: Check for a better kind of error.
    throw new Error('`getPrimitives()` not implemented on `SceneNode`!');
  };

  return SceneNode;
});
