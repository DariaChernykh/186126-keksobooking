'use strict';

(function () {

  var map = document.querySelector('.map');
  var cardTemplate = document.querySelector('template');
  var pinMain = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var address = document.getElementById('address');
  var PIN_MAIN_SIZE = 62;
  var PIN_MAIN_HALF_SIZE = PIN_MAIN_SIZE / 2;
  var ESC_CODE = 27;

  window.variables = {
    map: map,
    cardTemplate: cardTemplate,
    pinMain: pinMain,
    form: form,
    address: address,
    PIN_MAIN_SIZE: PIN_MAIN_SIZE,
    PIN_MAIN_HALF_SIZE: PIN_MAIN_HALF_SIZE,
    ESC_CODE: ESC_CODE,
  };

})();
