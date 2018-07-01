'use strict';

(function () {

  var map = window.variables.map;
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var pins = [];

  var onPinClick = function (index) {
    var popup = map.querySelector('.popup');
    if (popup) {
      popup.remove();
    }

    map.insertBefore(window.cards.get(index), mapFiltersContainer);
    window.controlCard.init();
  };

  var renderPins = function (array) {
    pins = window.createPins(array);
    pins.forEach(function (pin, index) {
      map.appendChild(pin);
      pin.addEventListener('click', onPinClick.bind(null, index));
    });
  };

  var removePins = function () {
    pins.forEach(function (pin) {
      map.removeChild(pin);
    });
  };

  window.controlPins = {
    render: renderPins,
    remove: removePins,
  };

})();
