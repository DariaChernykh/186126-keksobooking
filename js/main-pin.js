'use strict';

(function () {
  var pinMain = document.querySelector('.map__pin--main');

  var pinMainSize = 62;
  var pinMainArrow = 22;
  var pinMainHalfSize = pinMainSize / 2;
  var pinMainAll = pinMainSize + pinMainArrow;

  var onPinMainClick = function () {
    window.card.map.classList.remove('map--faded');
    window.form.form.classList.remove('ad-form--disabled');
    window.form.setDefaultValues();
    window.form.toggleFieldsetsVisability(false);
    window.card.renderPins();
    pinMain.style.left = pinMain.offsetLeft + 'px';
    pinMain.style.top = pinMain.offsetTop + 'px';
    window.form.address.value = (pinMain.offsetLeft + pinMainHalfSize) + ', '
      + (pinMain.offsetTop + pinMainAll);
    document.removeEventListener('click', onPinMainClick);
  };
  pinMain.addEventListener('click', onPinMainClick);


  var onPinMainMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onPinMainMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var minTop = 130 - (pinMainHalfSize + pinMainArrow);
      var maxTop = 630 - (pinMainHalfSize + pinMainArrow);
      var pinMinGridX = window.card.map.offsetLeft + pinMainHalfSize;
      var pinMaxGridX = window.card.map.offsetLeft +
        window.card.map.clientWidth - pinMainHalfSize;

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
        pinMain.style.left = (pinStyleLeft - window.card.map.offsetLeft -
          pinMainHalfSize) + 'px';
        pinMain.style.top = (pinStyleTop - pinMainHalfSize) + 'px';
        window.form.address.value = (pinStyleLeft -
          window.card.map.offsetLeft) + ', ' + (pinStyleTop + pinMainHalfSize +
          pinMainArrow);
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

  window.map = {
    pinMain: pinMain,
    pinMainHalfSize: pinMainHalfSize
  };
})();
