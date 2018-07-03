'use strict';

(function () {

  var filter = document.querySelector('.map__filters');
  var housingType = document.getElementById('housing-type');
  var housingPrice = document.getElementById('housing-price');
  var housingRooms = document.getElementById('housing-rooms');
  var housingGuests = document.getElementById('housing-guests');
  var housingFeatures = Array.from(document.querySelectorAll('.map__checkbox'));

  var PRICE_RANGES = {
    low: {
      max: 10000,
    },
    middle: {
      min: 10000,
      max: 50000,
    },
    high: {
      min: 50000,
    },
  };

  var copyAdverts = [];

  var checkType = function (advert) {
    if (housingType.value === 'any') {
      return true;
    } else {
      return advert.offer.type === housingType.value;
    }
  };

  var checkPrice = function (advert) {
    switch (housingPrice.value) {
      case 'low':
        return advert.offer.price <= PRICE_RANGES.low.max;
      case 'middle':
        return advert.offer.price >= PRICE_RANGES.middle.min &&
          advert.offer.price <= PRICE_RANGES.middle.max;
      case 'high':
        return advert.offer.price >= PRICE_RANGES.high.min;
      default:
        return true;
    }
  };

  var checkRoom = function (advert) {
    if (housingRooms.value === 'any') {
      return true;
    } else {
      return advert.offer.rooms === Number(housingRooms.value);
    }
  };

  var checkGuests = function (advert) {
    if (housingGuests.value === 'any') {
      return true;
    } else {
      return advert.offer.guests === Number(housingGuests.value);
    }
  };

  var checkFeature = function (advert) {
    for (var i = 0; i < housingFeatures.length; i++) {
      if (housingFeatures[i].checked && advert.offer.features.indexOf(housingFeatures[i].value) < 0) {
        return false;
      }
    }
    return true;
  };

  var onFormChange = function () {
    copyAdverts = window.adverts.slice();
    var filteredArray = copyAdverts.filter(function (advert) {
      return checkType(advert) && checkPrice(advert) &&
        checkRoom(advert) && checkGuests(advert) && checkFeature(advert);
    }).slice(0, 5);

    window.controlCard.close();
    window.controlPins.remove();
    window.cards.remove();
    window.cards.create(filteredArray);
    window.controlPins.render(filteredArray);
  };

  filter.addEventListener('change', window.debounce(onFormChange));

})();
