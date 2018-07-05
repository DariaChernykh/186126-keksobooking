'use strict';

(function () {

  var address = window.variables.address;
  var pinMain = window.variables.pinMain;
  var map = window.variables.map;
  var PIN_MAIN_SIZE = window.variables.PIN_MAIN_SIZE;
  var PIN_MAIN_HALF_SIZE = window.variables.PIN_MAIN_HALF_SIZE;
  var filter = window.variables.filter;
  var MAX_PINS_QUANTITY = window.variables.MAX_PINS_QUANTITY;

  var PIN_MAIN_ARROW = 22;
  var PIN_MAIN_ALL = PIN_MAIN_SIZE + PIN_MAIN_ARROW;
  var MIN_TOP = 130;
  var MAX_TOP = 630;

  var adverts = [];

  var successHandler = function (array) {
    adverts = array;
    window.map.activate();
    window.cards.create(adverts.slice(0, MAX_PINS_QUANTITY));
    window.controlPins.render(adverts.slice(0, MAX_PINS_QUANTITY));
  };

  var errorHandler = function (response) {
    window.showPopup(response);
  };

  var mainPinStart = {
    left: pinMain.offsetLeft,
    top: pinMain.offsetTop
  };

  var loadData = function () {
    address.value = (mainPinStart.left + PIN_MAIN_HALF_SIZE) + ', '
      + (mainPinStart.top + PIN_MAIN_ALL);

    window.backend.load(successHandler, errorHandler);
  };

  var onPinMainMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onPinMainMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var minTop = MIN_TOP - (PIN_MAIN_HALF_SIZE + PIN_MAIN_ARROW);
      var maxTop = MAX_TOP - (PIN_MAIN_HALF_SIZE + PIN_MAIN_ARROW);
      var pinMinGridX = map.offsetLeft + PIN_MAIN_HALF_SIZE;
      var pinMaxGridX = map.offsetLeft +
        map.clientWidth - PIN_MAIN_HALF_SIZE;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      var pinStyleLeft = evt.clientX - shift.x;
      var pinStyleTop = evt.clientY - shift.y;

      if (pinStyleTop >= minTop &&
        pinStyleTop <= maxTop &&
        pinStyleLeft > pinMinGridX &&
        pinStyleLeft < pinMaxGridX) {
        pinMain.style.left = (pinStyleLeft - map.offsetLeft -
          PIN_MAIN_HALF_SIZE) + 'px';
        pinMain.style.top = (pinStyleTop - PIN_MAIN_HALF_SIZE) + 'px';
        address.value = (pinStyleLeft - map.offsetLeft) + ', ' +
          (pinStyleTop + PIN_MAIN_HALF_SIZE + PIN_MAIN_ARROW);
      }
    };

    var onPinMainMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if (!window.map.isMapActive()) {
        loadData();
      }

      document.removeEventListener('mousemove', onPinMainMouseMove);
      document.removeEventListener('mouseup', onPinMainMouseUp);
    };

    document.addEventListener('mousemove', onPinMainMouseMove);
    document.addEventListener('mouseup', onPinMainMouseUp);
  };
  pinMain.addEventListener('mousedown', onPinMainMouseDown);

  var restoreConditions = function () {
    pinMain.style.left = mainPinStart.left + 'px';
    pinMain.style.top = mainPinStart.top + 'px';

    filter.reset();
    window.map.deactivate();
  };

  var onFormChange = function () {
    window.controlCard.close();
    window.controlPins.remove();
    window.cards.create(window.filter.filteredArray(adverts));
    window.controlPins.render(window.filter.filteredArray(adverts));
  };

  filter.addEventListener('change', window.debounce(onFormChange));

  window.main = {
    restore: restoreConditions,
  };

})();
