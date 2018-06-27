'use strict';

(function () {

  var cardTemplate = window.variables.cardTemplate;
  var adverts = window.data.adverts;
  var mapPin = cardTemplate.content.querySelector('.map__pin');

console.log(adverts);

  var PIN_HALF_WIDTH = 20;
  var PIN_HEIGHT = 40;

  var createPins = function () {
    var pins = [];
    adverts.forEach(function (advert) {
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
  // console.log(createPins());
  window.pins = {
    create: createPins()
  };

})();
