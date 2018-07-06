'use strict';

(function () {

  var TRANSLATE_TYPE = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var parse = function (advert) {
    var offer = [
      {
        isValid: checkString(advert.offer.title),
        data: advert.offer.title,
        name: '.popup__title',
      },
      {
        isValid: checkString(advert.offer.address),
        data: advert.offer.address,
        name: '.popup__text--address',
      },
      {
        isValid: checkNumber(advert.offer.price),
        data: advert.offer.price + ' ₽/ночь',
        name: '.popup__text--price',
      },
      {
        isValid: checkString(advert.offer.type),
        data: TRANSLATE_TYPE[advert.offer.type],
        name: '.popup__type',
      },
      {
        isValid: checkNumber(advert.offer.rooms) && checkNumber(advert.offer.guests),
        data: advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей',
        name: '.popup__text--capacity',
      },
      {
        isValid: checkString(advert.offer.checkin) && checkString(advert.offer.checkout),
        data: 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout,
        name: '.popup__text--time',
      },
      {
        isValid: checkString(advert.offer.description),
        data: advert.offer.description,
        name: '.popup__description',
      }
    ];

    return offer;
  };

  var checkString = function (stringToCheck) {
    return typeof stringToCheck === 'string' && stringToCheck.length !== 0;
  };

  var checkNumber = function (numberToCheck) {
    return typeof numberToCheck === 'number';
  };

  window.data = {
    parse: parse
  };

})();
