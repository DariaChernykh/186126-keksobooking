'use strict';

(function () {

  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');
  var filter = map.querySelector('.map__filters');
  var cardTemplate = document.querySelector('template');
  var form = document.querySelector('.ad-form');
  var address = form.querySelector('#address');

  var PIN_MAIN_SIZE = 62;
  var PIN_MAIN_HALF_SIZE = PIN_MAIN_SIZE / 2;
  var ESC_CODE = 27;
  var MAX_PINS_QUANTITY = 5;

  window.variables = {
    map: map,
    cardTemplate: cardTemplate,
    pinMain: pinMain,
    form: form,
    address: address,
    filter: filter,
    PIN_MAIN_SIZE: PIN_MAIN_SIZE,
    PIN_MAIN_HALF_SIZE: PIN_MAIN_HALF_SIZE,
    ESC_CODE: ESC_CODE,
    MAX_PINS_QUANTITY: MAX_PINS_QUANTITY
  };

})();
