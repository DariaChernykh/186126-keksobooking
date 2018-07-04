'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500;

  window.debounce = function (callback) {
    var lastTimeout = null;

    return function () {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(function () {
        callback();
      }, DEBOUNCE_INTERVAL);
    };
  };

})();
