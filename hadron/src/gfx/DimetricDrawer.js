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

    var metrics, xyCoordinates;

    metrics = new WorldMetrics();
    xyCoordinates = metrics.getProjection(primitive.position);

    this.save();
    this.beginPath();
    this.fillStyle = 'red';
    this.arc(xyCoordinates[0], xyCoordinates[1], 10, 0, Math.PI * 2);
    this.fill();
    this.restore(); 
  }

  return Drawer;
});
