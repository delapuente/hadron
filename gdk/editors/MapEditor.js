define(function(require) {
  'use strict';

  var DEFAULT_CELL_SIZE = 100;

  var S = require('hadron/scaffolding'),
      Model = require('hadron/Model'),
      Simulator = require('hadron/Simulator'),
      Textured = require('hadron/models/map/Textured'),
      Cuboid = require('hadron/models/map/geometries/Cuboid'),
      Composite = require('hadron/models/map/Composite'),
      Camera = require('hadron/models/visualization/Camera'),
      Scene = require('hadron/models/visualization/Scene'),
      MultiportWindow = require('hadron/models/visualization/MultiportWindow'),
      WorldMetrics = require('hadron/models/visualization/WorldMetrics'),
      AssistedMap = require('editors/AssistedMap');

  function MapEditor() {
    var target = new AssistedMap(DEFAULT_CELL_SIZE),
        camera = new Camera([0, 0]),
        scene = new Scene(target, camera);

    var viewportManager = new MultiportWindow('map-editor');
    S.theObject(this)
      .has('target', target)
      .has('_viewportManager', viewportManager)
      .has('metrics', new WorldMetrics(DEFAULT_CELL_SIZE));

    this._viewportManager
      .newViewport('main')
      .scene = scene
    ;

    Model.apply(this, arguments);
  }
  S.theClass(MapEditor).inheritsFrom(Model);

  MapEditor.prototype.resizeWindow = function(width, height) {
    var mainViewport = this._viewportManager.getViewport('main');
    mainViewport.width = width;
    mainViewport.height = height;
    mainViewport.scene.camera.resize(width, height);
  };

  MapEditor.prototype.setPointer = function(coordinates, isClicking) {
    this._viewportManager.setPointer(coordinates, isClicking);
  };

  MapEditor.prototype.getSubmodels = function(aspect) {
    return [this._viewportManager];
  };

  MapEditor.prototype.getMapEditorBuffer = function() {
    return this._viewportManager.render.windowBuffer;
  };

  MapEditor.prototype.doTestScenario = function(palette) {
    // Make two geometries...
    var wall = new Cuboid(300, 300, 100);
    var ceiling = new Cuboid(300, 100, 600);
  
    // Make a cave with them
    var cave = new Textured();
    cave.addObject(wall, [0, 0, 0]);
    cave.addObject(ceiling, [0, 200, 100]);
    cave.addObject(wall, [0, 0, 700]);

    // Make a large cave with the former one
    var largeCave = new Composite();
    largeCave.addObject(cave, [0, 0, 0]);
    largeCave.addObject(cave, [300, 0, 0]);

    // Add a large cave and a cave to the scene
    this.target.map.addObject(largeCave, [0, 0, 0]);
    this.target.map.addObject(cave, [0, 0, 1000]);
    var s = new Textured(), t = new Textured();
    t.addObject(new Cuboid(100, 100, 100), [0, 0, 0]);
    s.addObject(new Cuboid(100, 100, 100), [0, 0, 0]);
    /*this.target.map.addObject(t, [0, 0, 0]);
    this.target.map.addObject(s, [100, 0, 100]);*/
  };

  return MapEditor;
});
