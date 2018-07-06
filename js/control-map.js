'use strict';

(function () {

  var filter = window.variables.filter;
  var map = window.variables.map;
  var form = window.variables.form;

  var isActive = false;

  var activateMap = function (callback) {
    isActive = true;
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');

    filter.addEventListener('change', window.debounce(callback));
    window.form.addListeners();
  };

  var deactivateMap = function () {
    isActive = false;
    map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
    window.pin.remove();
    window.card.close();

    filter.removeEventListener('change', window.debounce);
  };

  var isMapActive = function () {
    return isActive;
  };

  window.map = {
    activate: activateMap,
    deactivate: deactivateMap,
    isMapActive: isMapActive
  };

})();
