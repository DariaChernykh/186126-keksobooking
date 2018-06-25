'use strict';

(function () {

  var map = document.querySelector('.map');
  var cardTemplate = document.querySelector('template');
  var pinMain = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var address = document.getElementById('address');
  var MAX_PRICE = 1000000;

  window.variables = {
    map: map,
    cardTemplate: cardTemplate,
    pinMain: pinMain,
    form: form,
    address: address,
    maxPrice: MAX_PRICE
  };

})();
