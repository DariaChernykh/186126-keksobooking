'use strict';

(function () {
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var map = document.querySelector('.map');

  var closeCard = function () {
    var close = map.querySelector('.popup__close');
    if (!close) {
      return (closeCard);
    }

    close.parentElement.remove();
    close.removeEventListener('click', onCloseClick);
    document.removeEventListener('keydown', onCloseClick);

  };

  var onCloseClick = function () {
    closeCard();
  };

  var onCloseKeydown = function (evt) {
    if (evt.keyCode === 27 || evt.keyCode === 13) {
      closeCard();
    }
  };

  var initCard = function () {
    var close = map.querySelector('.popup__close');
    close.focus();

    close.addEventListener('click', onCloseClick);
    document.addEventListener('keydown', onCloseKeydown);
  };

  var onPinClick = function (index) {
    var popup = map.querySelector('.popup');
    if (popup) {
      popup.remove();
    }

    map.insertBefore(window.pinAndCard.cards[index], mapFiltersContainer);
    initCard();
  };

  var renderPins = function () {
    window.pinAndCard.pins.forEach(function (pin, index) {
      map.appendChild(pin);
      pin.addEventListener('click', onPinClick.bind(null, index));
    });
    return (renderPins);
  };

  var removePins = function () {
    window.pinAndCard.pins.forEach(function (pin) {
      map.removeChild(pin);
    });
    return (removePins);
  };

  window.card = {
    closeCard: closeCard(),
    renderPins: renderPins(),
    removePins: removePins(),
    map: map
  };
})();
