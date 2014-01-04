define(function(require) {
  'use strict';

  var T = require('hadron/toolkit'),
      S = require('hadron/scaffolding'),
      IsometricEntity = require('hadron/models/map/IsometricEntity'),
      MapObject = require('hadron/models/map/MapObject'),
      WorldMetrics = require('hadron/models/visualization/WorldMetrics'),
      Render = require('hadron/models/map/CompositeRender');

  function Composite() {
    S.theObject(this)
      .has('_objects', []),
    ;
    IsometricEntity.apply(this, arguments);
  }
  S.theClass(Composite).inheritsFrom(IsometricEntity);

  Composite.prototype.render = Render;

  Composite.prototype.removeObject = function(object) {

  };

  Composite.prototype.getObjectAt = function(mapPosition) {
    // TODO: Return the front-most object at the specified position
  };

  Composite.prototype.addObject = function(type, position) {
    var newMapObject = new MapObject(type, position);
    this._objects.push(newMapObject);
  };

  Composite.prototype.setPointer = function(coordinates, isClicking) {
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

  return Composite;
});
