define(function(require) {
  'use strict';

  var NEXT_ID = 1,
      IS_PRECALL = false,
      IS_POSTCALL = true;

  var T = require('hadron/toolkit'),
      S = require('hadron/scaffolding'),
      Render = require('hadron/Render'),
      Simulator = require('hadron/Simulator');

  function setupFacets(model, args) {
    var isAFacetConstructor, baseClass, facetPrototype, newFacet,
        facets = {
          'simulate': Simulator,
          'clear': function() {}, // TODO: Add base class for Cleaner
          'render': Render
        };
    for (var facet in facets) if (facets.hasOwnProperty(facet)) {
      baseClass = facets[facet];
      facetPrototype = model[facet].prototype
      isAFacetConstructor = facetPrototype instanceof baseClass;
      if (isAFacetConstructor) {
        newFacet = Object.create(facetPrototype);
        model[facet].apply(newFacet, [model].concat(args))
        model[facet] = newFacet;
      }
    }
  }

  function Model() {
    S.theObject(this)
      .has('id', NEXT_ID++)
      .has('_listeners', {})
    ;
    setupFacets(this, [].slice.call(arguments, 0));
  }

  Model.prototype.traverse =
  function(methodName, submodelsGetterName, methodArgs) {

    var submodels,
        submodelsMethod,
        method = this[methodName],
        isMethodApplicable = T.isApplicable(method);

    methodArgs = [null].concat(methodArgs);

    // pre-call
    if (isMethodApplicable) {
      methodArgs[0] = IS_PRECALL;
      method.apply(this, methodArgs);
    }

    // get submodules
    // TODO: Consider applying getSubmodels() to the facet instead of model
    // and passing the model as first parameter as already done with the main
    // facet method.
    submodels = [];
    submodelsMethod = this[submodelsGetterName];
    if (T.isApplicable(submodelsMethod)) {
      submodels = submodelsMethod.apply(this) || [];
    }

    // traverse submodules
    for (var i = 0, submodel; submodel = submodels[i]; i++) {
      submodel.traverse.apply(submodel, arguments);
    }

    // post-call
    if (isMethodApplicable) {
      methodArgs[0] = IS_POSTCALL;
      method.apply(this, methodArgs);
    }
  };

  Model.prototype.simulate = T.noop;

  Model.prototype.getSimulateSubmodels = function() {
    return this.getSubmodels();
  };

  Model.prototype.clear = T.noop;

  Model.prototype.getClearSubmodels = function() {
    return this.getSubmodels();
  };

  Model.prototype.render = T.noop;

  Model.prototype.getRenderSubmodels = function() {
    return this.getSubmodels();
  };

  Model.prototype.getSubmodels = function() {
    return [];
  };

  Model.prototype.dispatchEvent = function(type, event) {
    this.runListeners(type, event);
  };

  Model.prototype.runListeners = function(type, event) {
    var listeners = this._listeners[type] || [],
        newListeners = [];

    event.type = type;
    event.target = this;
    listeners.forEach(function onCallback(pair) {
      var callback = pair[0];
      var once = pair[1];
      callback(event);
      if (!once) { newListeners.push(pair); }
    });
    this._listeners[type] = newListeners;
  };

  Model.prototype.addEventListener = function(type, callback, once) {
    var listeners = this._listeners,
        typeListeners = listeners[type] = (listeners[type] || []);

    if (!typeListeners.some(alreadyListening)) {
      typeListeners.push([callback, once]);
    }

    function alreadyListening(pair) {
      return pair[0] === callback;
    };
  };

  Model.prototype.removeEventListener = function(type, callback) {
    var listeners = this._listeners,
        typeListeners = listeners[type] = listeners[type] || [],
        position = -1;

    for (var l = 0, pair; (pair = typeListeners[l]) && position < 0; l++) {
      if (pair[0] === callback) { position = l; }
    }

    if (position !== -1) {
      listeners[type].splice(position, 1);
    }
  };

  Model.prototype.removeAllEventListener = function (type) {
    this._listeners[type] = [];
  };

  return Model;
});
