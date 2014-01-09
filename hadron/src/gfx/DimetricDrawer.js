/*
 * A drawer is the component for drawing into a rendering context such as 2D
 * context of a canvas. The DimetricDrawer is the Hadron main drawer and is
 ^ in charge of provide isometric drawing utilities.
 */
define(function(require) {
  'use strict';

  var S = require('hadron/scaffolding'),
      T = require('hadron/toolkit'),
      WorldMetrics = require('hadron/models/visualization/WorldMetrics');

  function Drawer(context) {
    S.the(context)
      .has(drawCuboid)
      .has(setDimetricProjection);

    return context;
  }

  // Remember transformation are applied from bottom to top.
  function setDimetricProjection() {
    this.scale(1, 0.5);
    this.rotate(-Math.PI / 4);
  }

  function drawCuboid(primitive, options) {
    options = T.extend({
      lineColor: false,
      lineWidth: 1,
      faceColor: [237, 12, 70, 1]
    }, options || {});

    var metrics = new WorldMetrics(),
        offset = primitive.position,
        xLength = primitive.dimensions[0],
        yLength = primitive.dimensions[1],
        zLength = primitive.dimensions[2],
        points = [];
    
    points = [
      offset,
      add(offset, [xLength, 0, 0]),
      add(offset, [xLength, 0, zLength]),
      add(offset, [0, 0, zLength]),
      add(offset, [0, yLength, 0]),
      add(offset, [xLength, yLength, 0]),
      add(offset, [xLength, yLength, zLength]),
      add(offset, [0, yLength, zLength]),
    ];
    for (var i = 0, l = points.length; i < l; i++) {
      points[i] = metrics.getProjection(points[i]);
    }

    this.save();
    this.strokeStyle = 'black';
    
    this.beginPath();
    this.fillStyle = 'red';
    this.moveTo.apply(this, points[1]);
    this.lineTo.apply(this, points[2]);
    this.lineTo.apply(this, points[6]);
    this.lineTo.apply(this, points[5]);
    this.fill();
    this.stroke();

    this.beginPath();
    this.fillStyle = 'green';
    this.moveTo.apply(this, points[2]);
    this.lineTo.apply(this, points[3]);
    this.lineTo.apply(this, points[7]);
    this.lineTo.apply(this, points[6]);
    this.fill();
    this.stroke();

    this.beginPath();
    this.fillStyle = 'blue';
    this.moveTo.apply(this, points[4]);
    this.lineTo.apply(this, points[5]);
    this.lineTo.apply(this, points[6]);
    this.lineTo.apply(this, points[7]);
    this.fill();
    this.stroke();

    this.restore(); 
  }
  
  function add(v1, v2) {
    var result = [];
    for (var i = 0, l = v1.length; i < l; i++) {
      result[i] = v1[i] + v2[i];
    }
    return result;
  }
  
  function vectorFromScalar(scalar, dimension, dimensionCount) {
    dimensionCount = dimensionCount || 3;
    var result = [];
    for (var i = 0; i < dimensionCount; i++) {
      result[i] = 0;
    }
    result[dimension] = scalar;
    return result;
  }

  return Drawer;
});
