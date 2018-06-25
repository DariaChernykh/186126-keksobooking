'use strict';

(function () {

  var form = window.variables.form;
  var map = window.variables.map;

  var activateMap = function () {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    window.controlPins.render();
  };

  var deactivateMap = function () {
    map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
    window.controlPins.remove();
    window.controlCard.close();
  };

  window.map = {
    activateMap: activateMap,
    deactivateMap: deactivateMap
  };

})();