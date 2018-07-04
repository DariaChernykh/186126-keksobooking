'use strict';

(function () {

  var form = window.variables.form;
  var map = window.variables.map;

  var isActive = false;

  var activateMap = function () {
    isActive = true;
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
  };

  var deactivateMap = function () {
    isActive = false;
    map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
    window.controlPins.remove();
    window.controlCard.close();
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
