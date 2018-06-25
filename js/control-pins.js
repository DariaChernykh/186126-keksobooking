'use strict';

(function () {

  var map = window.variables.map;
  var pins = window.createPins.pins;
  var cards = window.createCards.cards;
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  var onPinClick = function (index) {
    var popup = map.querySelector('.popup');
    if (popup) {
      popup.remove();
    }

    map.insertBefore(cards[index], mapFiltersContainer);
    window.controlCard.initCard();
  };

  var renderPins = function () {
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
    renderPins: renderPins,
    removePins: removePins,
  };

})();
