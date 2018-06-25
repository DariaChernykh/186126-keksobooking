'use strict';

(function () {

  var map = window.variables.map;

  var ESC_CODE = 27;
  var ENTER_CODE = 13;

  var closeCard = function () {
    var close = map.querySelector('.popup__close');
    if (!close) {
      return;
    }
    close.parentElement.remove();
    close.removeEventListener('click', onCloseClick);
    document.removeEventListener('keydown', onCloseClick);
  };

  var onCloseClick = function () {
    closeCard();
  };

  var onCloseKeydown = function (evt) {
    if (evt.keyCode === ESC_CODE || evt.keyCode === ENTER_CODE) {
      closeCard();
    }
  };

  var initCard = function () {
    var close = map.querySelector('.popup__close');
    close.focus();

    close.addEventListener('click', onCloseClick);
    document.addEventListener('keydown', onCloseKeydown);
  };

  window.controlCard = {
    closeCard: closeCard,
    initCard: initCard
  };

})();
