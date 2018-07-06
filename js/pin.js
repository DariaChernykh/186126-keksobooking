'use strict';

(function () {

  var map = window.variables.map;
  var cardTemplate = window.variables.cardTemplate;

  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mapPin = cardTemplate.content.querySelector('.map__pin');

  var PIN_HALF_WIDTH = 20;
  var PIN_HEIGHT = 40;

  var pins = [];

  var createPins = function (adverts) {
    pins = adverts.map(function (advert) {
      var pin = mapPin.cloneNode(true);
      pin.querySelector('img').src = advert.author.avatar;
      pin.style.left
        = (advert.location.x - PIN_HALF_WIDTH) + 'px';
      pin.style.top
        = (advert.location.y - PIN_HEIGHT) + 'px';
      pin.tabIndex = '0';
      return pin;
    });
    return pins;
  };

  var onPinClick = function (index) {
    var popup = map.querySelector('.popup');
    if (popup) {
      popup.remove();
    }

    map.insertBefore(window.card.get(index), mapFiltersContainer);
    window.card.init();
  };

  var renderPins = function (array) {
    pins = createPins(array);
    pins.forEach(function (pin, index) {
      map.appendChild(pin);
      pin.addEventListener('click', onPinClick.bind(null, index));
    });
  };

  var removePins = function () {
    pins.forEach(function (pin, index) {
      pin.removeEventListener('click', onPinClick.bind(null, index));
      map.removeChild(pin);
    });
  };

  window.pin = {
    render: renderPins,
    remove: removePins,
  };

})();
