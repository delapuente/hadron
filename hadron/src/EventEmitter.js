define([], function () {

  function EventEmitter() {
    Object.defineProperty(this, '_listeners', { value: {} });
  }

  EventEmitter.prototype.dispatchEvent = function(type, event) {
    this.runListeners(type, event);
  };

  EventEmitter.prototype.runListeners = function(type, event) {
    var listeners = this._listeners[type] || [],
        newListeners = [];

    event = event || {};
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

  EventEmitter.prototype.addEventListener = function(type, callback, once) {
    var listeners = this._listeners,
        typeListeners = listeners[type] = (listeners[type] || []);

    if (!typeListeners.some(alreadyListening)) {
      typeListeners.push([callback, once]);
    }

    function alreadyListening(pair) {
      return pair[0] === callback;
    };
  };

  EventEmitter.prototype.removeEventListener = function(type, callback) {
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

  EventEmitter.prototype.removeAllEventListener = function (type) {
    this._listeners[type] = [];
  };

  return EventEmitter;
});
