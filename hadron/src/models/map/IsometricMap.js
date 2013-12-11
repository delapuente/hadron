define(function(require) {
  'use strict';

  var T = require('hadron/toolkit'),
      S = require('hadron/scaffolding'),
      Cell = require('hadron/models/map/Cell'),
      Model = require('hadron/Model'),
      WorldMetrics = require('hadron/models/visualization/WorldMetrics'),
      Render = require('hadron/models/map/IsometricMapRender');

  function IsometricMap() {
    S.theObject(this)
      .has('_objects', []),
    ;

    Model.apply(this, arguments);
  }
  S.theClass(IsometricMap).inheritsFrom(Model);

  IsometricMap.prototype.render = Render;

  IsometricMap.prototype.removeObject = function(object) {

  };

  IsometricMap.prototype.getObjectAt = function(mapPosition) {
    // TODO: Return the front-most object at the specified position
  };

  IsometricMap.prototype.addObject = function(object) {
    this._objects.push(object);
  };

  IsometricMap.prototype.setPointer = function(coordinates, isClicking) {
/*    var mapPosition = this.metrics.getMapCoordinates(coordinates);

    this.dispatchEvent('pointermove', {
      mapX: mapPosition[0],
      mapZ: mapPosition[1]
    });

    if (isClicking) {
      this.dispatchEvent('click', {
        mapX: mapPosition[0],
        mapZ: mapPosition[1]
      });
    }*/
  };

  return IsometricMap;
});
