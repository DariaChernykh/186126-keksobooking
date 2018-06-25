'use strict';

(function () {
  var form = window.variables.form;
  var address = window.variables.address;
  var pinMain = window.variables.pinMain;
  var map = window.variables.map;
  var removePins = window.controlPins.removePins;
  var closeCard = window.controlCard.closeCard;
  var renderPins = window.controlPins.renderPins;

  var PIN_MAIN_SIZE = 62;
  var PIN_MAIN_ARROW = 22;
  var PIN_MAIN_HALF_SIZE = PIN_MAIN_SIZE / 2;
  var PIN_MAIN_ALL = PIN_MAIN_SIZE + PIN_MAIN_ARROW;
  var MIN_TOP = 130;
  var MAX_TOP = 630;

  var onPinMainClick = function () {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    renderPins();
    pinMain.style.left = pinMain.offsetLeft + 'px';
    pinMain.style.top = pinMain.offsetTop + 'px';
    address.value = (pinMain.offsetLeft + PIN_MAIN_HALF_SIZE) + ', '
      + (pinMain.offsetTop + PIN_MAIN_ALL);
    document.removeEventListener('mousedown', onPinMainClick);
  };
  pinMain.addEventListener('mousedown', onPinMainClick);

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

      document.removeEventListener('mousemove', onPinMainMouseMove);
      document.removeEventListener('mouseup', onPinMainMouseUp);
    };

    document.addEventListener('mousemove', onPinMainMouseMove);
    document.addEventListener('mouseup', onPinMainMouseUp);
  };
  pinMain.addEventListener('mousedown', onPinMainMouseDown);

  var deactivateMap = function () {
    map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
    removePins();
    closeCard();
  };
  window.controlMainPin = {
    pinMainHalfSize: PIN_MAIN_HALF_SIZE,
    deactivateMap: deactivateMap,
  };

})();
