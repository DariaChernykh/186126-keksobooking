'use strict';

(function () {

  var filter = window.variables.filter;
  var MAX_PINS_QUANTITY = window.variables.MAX_PINS_QUANTITY;

  var housingType = filter.querySelector('#housing-type');
  var housingPrice = filter.querySelector('#housing-price');
  var housingRooms = filter.querySelector('#housing-rooms');
  var housingGuests = filter.querySelector('#housing-guests');
  var housingFeatures = Array.from(filter.querySelectorAll('.map__checkbox'));

  var PRICE_RANGES = {
    LOW: 10000,
    MIDDLE: 50000
  };

  var checkType = function (advert) {
    return housingType.value === 'any' ? true :
      advert.offer.type === housingType.value;
  };

  var checkPrice = function (advert) {
    switch (housingPrice.value) {
      case 'low':
        return advert.offer.price < PRICE_RANGES.LOW;
      case 'middle':
        return advert.offer.price >= PRICE_RANGES.LOW &&
          advert.offer.price <= PRICE_RANGES.MIDDLE;
      case 'high':
        return advert.offer.price > PRICE_RANGES.MIDDLE;
      default:
        return true;
    }
  };

  var checkRoom = function (advert) {
    return housingRooms.value === 'any' ? true :
      advert.offer.rooms === Number(housingRooms.value);
  };

  var checkGuests = function (advert) {
    return housingGuests.value === 'any' ? true :
      advert.offer.guests === Number(housingGuests.value);
  };

  var checkFeature = function (advert) {
    var response = true;
    housingFeatures.forEach(function (feature) {
      if (feature.checked &&
        advert.offer.features.indexOf(feature.value) < 0) {
        response = false;
      }
    });
    return response;
  };

  var getFilteredAdverts = function (adverts) {
    var copyAdverts = adverts.slice();
    var filteredArray = copyAdverts.filter(function (advert) {
      return checkType(advert) && checkPrice(advert) &&
        checkRoom(advert) && checkGuests(advert) && checkFeature(advert);
    }).slice(0, MAX_PINS_QUANTITY);
    return filteredArray;
  };

  window.filter = {
    filteredArray: getFilteredAdverts
  };

})();
