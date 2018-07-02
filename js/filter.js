'use strict';

(function () {

  var filter = document.querySelector('.map__filters');
  var type = document.getElementById('housing-type');
  var price = document.getElementById('housing-price');
  var rooms = document.getElementById('housing-rooms');
  var guests = document.getElementById('housing-guests');
  var features = document.getElementById('housing-features');

  var copyAdverts = [];

  var onFormChange = function () {


    copyAdverts = window.adverts.slice();
    console.log (copyAdverts);
    var filteredArray = copyAdverts.filter(function (item) {
      var selectedType = item.offer.type === type.value;
      var selectedRooms = item.offer.rooms === Number(rooms.value);
      return selectedType || selectedRooms;
    });
    console.log (filteredArray);
  };

  filter.addEventListener('change', onFormChange);
  var filteredAdverts = copyAdverts;
  var updatePins = function () {

  };

})();
