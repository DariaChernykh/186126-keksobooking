'use strict';

(function () {

  var map = window.variables.map;
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  var onPinClick = function (index) {
    var popup = map.querySelector('.popup');
    if (popup) {
      popup.remove();
    }

    map.insertBefore(window.cards.create[index], mapFiltersContainer);
    window.controlCard.init();
  };

  var renderPins = function () {
    window.pins.create.forEach(function (pin, index) {
      map.appendChild(pin);
      pin.addEventListener('click', onPinClick.bind(null, index));
    });
  };

  var removePins = function () {
    window.pins.create.forEach(function (pin) {
      map.removeChild(pin);
    });
  };

  window.controlPins = {
    render: renderPins,
    remove: removePins,
  };

})();
