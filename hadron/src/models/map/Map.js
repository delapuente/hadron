define(function(require) {
  'use strict';

  var T = require('hadron/toolkit'),
      S = require('hadron/scaffolding'),
      Composite = require('hadron/models/map/Composite'),
      WorldMetrics = require('hadron/models/visualization/WorldMetrics');

  function Map() {
    Composite.apply(this, arguments);
  }
  S.theClass(Map).inheritsFrom(Composite);

  // TODO: What to dispatch here? Position on the map when Y = 0?
  Map.prototype.setPointer = function(coordinates, isClicking) {
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

  return Map;
});
