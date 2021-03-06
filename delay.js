window.Delay = (function (window, document, undefined) {
  'use strict';

  var store = [], delay = 250, checkTimeout, registered = false;

  var _init = function(opt){
    _registerOptions( opt );
    _registerListeners();
  };

  var _registerListeners = function(){
    if( registered )return;
    registered = true;
    if (document.addEventListener) { window.addEventListener('scroll', _throttle, false); }
    else { window.attachEvent('onscroll', _throttle); }
  };

  var _registerOptions = function(opt){
    if( opt ){
      delay = parseInt(opt._delay) || delay;
    }
  };

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

  var _subscribe = function(options) {
    if( !registered ){ _init(); }
    if( !(options.element instanceof Element) || !(options.callback instanceof Function) )return;
    store.push({
      element: options.element,
      callback: options.callback,
      once: !!options.once,
      offset: options.offset || 250
    });

    _throttle();
  };

  return {
    init           : _init,
    subscribe      : _subscribe,
  };
})(window, document);