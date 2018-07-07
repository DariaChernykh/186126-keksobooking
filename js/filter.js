'use strict';

(function () {

  var filter = window.variables.filter;
  var MAX_PINS_QUANTITY = window.variables.MAX_PINS_QUANTITY;

  var housingType = filter.querySelector('#housing-type');
  var housingPrice = filter.querySelector('#housing-price');
  var housingRooms = filter.querySelector('#housing-rooms');
  var housingGuests = filter.querySelector('#housing-guests');

  var priceRange = {
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
        return advert.offer.price < priceRange.LOW;
      case 'middle':
        return advert.offer.price >= priceRange.LOW &&
          advert.offer.price <= priceRange.MIDDLE;
      case 'high':
        return advert.offer.price > priceRange.MIDDLE;
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

  var checkFeature = function (feature) {
    var housingFeatures = Array.from(filter.querySelectorAll('.map__checkbox:checked'));
    return housingFeatures.every(function (housingFeature) {
      return feature.indexOf(housingFeature.value) >= 0;
    });
  };

  var getFilteredAdverts = function (adverts) {
    var copyAdverts = adverts.slice();
    var filteredAdverts = copyAdverts.filter(function (advert) {
      return checkType(advert) && checkPrice(advert) &&
        checkRoom(advert) && checkGuests(advert) && checkFeature(advert.offer.features);
    }).slice(0, MAX_PINS_QUANTITY);
    return filteredAdverts;
  };

  window.filter = {
    filteredAdverts: getFilteredAdverts
  };

})();
