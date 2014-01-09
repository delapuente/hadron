define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding');

  var DIMETRIC_ANGLE = Math.atan(0.5),
      SCALATION_FACTOR = Math.sqrt(10) / 4;

  var metricCache = { };

  function WorldMetrics(cellSize) {
    cellSize = cellSize || 100;
    if (!metricCache[cellSize]) {

      var PROJECTED_SIZE = cellSize * SCALATION_FACTOR,
          SIN = Math.sin(DIMETRIC_ANGLE),
          COS = Math.cos(DIMETRIC_ANGLE),
          H_RADIUS = Math.cos(DIMETRIC_ANGLE) * PROJECTED_SIZE,
          V_RADIUS = Math.sin(DIMETRIC_ANGLE) * PROJECTED_SIZE,
          X_AXIS = [H_RADIUS, V_RADIUS],
          Z_AXIS = [-H_RADIUS, V_RADIUS];

      S.theObject(this)
        .has('DIMETRIC_ANGLE', DIMETRIC_ANGLE)
        .has('SIN', SIN)
        .has('COS', COS)
        .has('SCALATION_FACTOR', SCALATION_FACTOR)
        .has('CELL_SIZE', cellSize)
        .has('H_RADIUS', H_RADIUS)
        .has('V_RADIUS', V_RADIUS)
        .has('H_DIAGONAL', 2 * H_RADIUS)
        .has('V_DIAGONAL', 2 * V_RADIUS)
        .has('X_AXIS', X_AXIS)
        .has('Z_AXIS', Z_AXIS)
        .has('PROJECTED_SIZE', PROJECTED_SIZE);

      metricCache[cellSize] = this;
    }

    return metricCache[cellSize];
  }

  // XXX: Directly assumes primitives are cuboids
  WorldMetrics.prototype.getOverlapped = function(primitiveA, primitiveB) {
    var X = 0, Y = 1, Z = 2;

    var aBack = primitiveA.position,
        aFront = [
          aBack[X] + primitiveA.dimensions[X],
          aBack[Y] + primitiveA.dimensions[Y],
          aBack[Z] + primitiveA.dimensions[Z]
        ],
        bBack = primitiveB.position,
        bFront = [
          bBack[X] + primitiveB.dimensions[X],
          bBack[Y] + primitiveB.dimensions[Y],
          bBack[Z] + primitiveB.dimensions[Z]
        ];

    var overlapped = undefined;

    if (
      overlaps(
       [aBack[X] - aFront[Z], aFront[X] - aBack[Z]],
       [bBack[X] - bFront[Z], bFront[X] - bBack[Z]]
      ) &&
      overlaps(
       [aBack[X] + aFront[Y], aFront[X] + aBack[Y]],
       [bBack[X] + bFront[Y], bFront[X] + bBack[Y]]
      ) &&
      overlaps(
       [-aFront[Z] - aBack[Y], -aBack[Z] - aFront[Y]],
       [-bFront[Z] - bBack[Y], -bBack[Z] - bFront[Y]]
      )
    ) {
      if (aFront[X] < bBack[X] ||
          aFront[Z] < bBack[Z] ||
          aFront[Y] < bBack[Y])
      {
        overlapped = primitiveA;
      }

      if (bFront[X] < aBack[X] ||
          bFront[Z] < aBack[Z] ||
          bFront[Y] < aBack[Y])
      {
        overlapped = primitiveB;
      }
    }

    return overlapped;
  };

  function overlaps(intervalA, intervalB) {
    return intervalA[1] >= intervalB[0] && intervalB[1] >= intervalA[0];
  }

  WorldMetrics.prototype.getWorkSpaceCoordinates = function(cellPosition) {
    var x = cellPosition[0], z = cellPosition[1];
    return [(x - z) * this.H_RADIUS, (x + z) * this.V_RADIUS];
  };

  WorldMetrics.prototype.getProjection = function(mapCoordinate) {
    var x = mapCoordinate[0],
        y = mapCoordinate[1],
        z = mapCoordinate[2];
    return [x - z, x / 2 + z / 2 - y];
  };

  WorldMetrics.prototype.getMapCoordinates = function(worldPosition) {
    var self = this;
    var x = worldPosition[0], y = worldPosition[1],
        intersectionWithX, intersectionWithZ, indexX, indexZ;

    intersectionWithX = [x / 2 + y, x / 4 + y / 2];
    indexX = getIndex(intersectionWithX, self.X_AXIS);

    intersectionWithZ = [x / 2 - y, -x / 4 + y / 2];
    indexZ = getIndex(intersectionWithZ, self.Z_AXIS);

    return [indexX, indexZ];

    function getIndex(point, axis) {
      var s, d = Math.sqrt(Math.pow(point[0], 2) + Math.pow(point[1], 2));
      if (sameSign(point[0], axis[0]) && sameSign(point[1], axis[1])) {
        s = 1;
      }
      else {
        s = -1;
      }
      return Math.ceil(s * d / self.PROJECTED_SIZE);
    }

    function sameSign(a, b) {
      return a === b || a > 0 && b > 0 || a < 0 && b < 0;
    }
  };

  return WorldMetrics;

});
