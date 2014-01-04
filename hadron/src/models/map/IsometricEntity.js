define(function(require) {
  'use strict';

  var T = require('hadron/toolkit'),
      S = require('hadron/scaffolding'),
      Model = require('hadron/Model'),
      WorldMetrics = require('hadron/models/visualization/WorldMetrics');

  function IsometricEntity() {
    Model.apply(this, arguments);
  }
  S.theClass(IsometricEntity).inheritsFrom(Model);

  return IsometricEntity;
});
