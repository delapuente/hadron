define([
  'hadron/toolkit',
  'hadron/scaffolding',
  'hadron/Render',
  'hadron/Simulator',
  'hadron/EventEmitter'
], function(T, S, Render, Simulator, EventEmitter) {
  'use strict';

  var NEXT_ID = 1,
      IS_PRECALL = false,
      IS_POSTCALL = true;

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
    EventEmitter.apply(this);
    S.theObject(this)
      .has('id', NEXT_ID++)
    ;

    // Facets must be the last thing to do
    setupFacets(this, [].slice.call(arguments, 0));
  }
  S.theClass(Model).mix(EventEmitter);

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
    var args = arguments;
    submodels.forEach(function (submodel) {
      submodel.traverse.apply(submodel, args);
    });

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

  return Model;
});
