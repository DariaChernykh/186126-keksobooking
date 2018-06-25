'use strict';

(function () {

  var cardTemplate = window.variables.cardTemplate;
  var mapPin = cardTemplate.content.querySelector('.map__pin');

  var PIN_HALF_WIDTH = 20;
  var PIN_HEIGHT = 40;

  var createPins = function () {
    var pins = [];
    window.data.adverts.forEach(function (advert) {
      var pin = mapPin.cloneNode(true);
      pin.querySelector('img').src = advert.author.avatar;
      pin.style.left
        = (advert.location.x - PIN_HALF_WIDTH) + 'px';
      pin.style.top
        = (advert.location.y - PIN_HEIGHT) + 'px';
      pin.tabIndex = '0';
      pins.push(pin);
    });
    return pins;
  };

  createPins();

  window.createPins = {
    pins: createPins()
  };

})();
