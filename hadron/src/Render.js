define(function(require) {
  'use strict';

  var T = require('hadron/toolkit');

  var NOOP = T.noop;
  var IS_PRECALL = false;
  var IS_POSTCALL = true;

  function Render() { }

  Render.prototype.apply = function(model, args) {
    var isPostCall = args[0],
        newArgs = [model].concat(args.slice(1));
    this[isPostCall ? 'postRender' : 'render'].apply(this, newArgs);
  };

  Render.prototype.render = NOOP;
  Render.prototype.postRender = NOOP;

  Render.prototype.delegateToRender = function (model) {
    var args = [IS_PRECALL].concat(Array.prototype.slice.call(arguments, 1));
    model.render.apply(model, args);
  };

  /* TODO: Consider make a factory for delegations */
  Render.prototype.delegateToPostRender = function (model) {
    var args = [IS_POSTCALL].concat(Array.prototype.slice.call(arguments, 1));
    model.postRender.apply(model, args);
  };

  return Render;
});
