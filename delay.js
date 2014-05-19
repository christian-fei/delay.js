window.Delay = (function (window, document, undefined) {
  'use strict';

  var store = [], delay = 250, checkTimeout;

  var _inView = function (obj) {
    var coords = obj.element.getBoundingClientRect();
    return ((coords.top >= 0 && coords.left >= 0 && coords.top) <= (window.innerHeight || document.documentElement.clientHeight) + parseInt(obj.offset));
  };

  var _check = function () {
    for (var i = 0, l = store.length; i<l; i++) {
      var self = store[i];
      if ( self && !self.called && _inView(self)) {
        if( self.once ){
          store.splice(i,1);
          l--;
        }
        self.callback.call(self.element);
      }
    }
  };

  var _throttle = function () {
    clearTimeout(checkTimeout);
    checkTimeout = setTimeout(_check, delay);
  };

  var _config = function(_delay){
    delay = parseInt(_delay) || delay;
  };

  var _subscribe = function(options) {
    if( !(options.element instanceof Element) || !(options.callback instanceof Function) )return;
    store.push({
      element: options.element,
      callback: options.callback,
      once: !!options.once,
      offset: options.offset || 250
    });

    _throttle();

    if (document.addEventListener) {
      window.addEventListener('scroll', _throttle, false);
    } else {
      window.attachEvent('onscroll', _throttle);
    }
  };




  return {
    config          : _config,
    subscribe      : _subscribe,
  };
})(window, document);