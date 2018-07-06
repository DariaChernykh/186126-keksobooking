'use strict';

(function () {

  var cardTemplate = window.variables.cardTemplate;
  var map = window.variables.map;
  var ESC_CODE = window.variables.ESC_CODE;

  var mapCard = cardTemplate.content.querySelector('.map__card');

  var ENTER_CODE = 13;
  var IMAGE_WIDTH = 45;
  var IMAGE_HEIGHT = 40;

  var cards = [];

  var createCards = function (array) {
    if (cards.length > 0) {
      cards = [];
    }

    cards = array.map(function (advert) {
      var card = mapCard.cloneNode(true);
      var parsedAdverts = window.data.parse(advert);

      toggleAuthorAvatar(advert.author.avatar, card);
      toggleSimpleFields(parsedAdverts, card);
      toggleFeatures(advert.offer.features, card);
      togglePhotos(advert.offer.photos, card);
      return card;
    });
    return cards;
  };

  var toggleAuthorAvatar = function (data, card) {
    var cloneElement = card.querySelector('.popup__avatar');
    if (typeof data === 'string' && data.length > 0) {
      cloneElement.src = data;
    } else {
      cloneElement.remove();
    }
  };

  var toggleSimpleFields = function (parsedAdverts, card) {
    parsedAdverts.forEach(function (parsedAdvert) {
      var cloneElement = card.querySelector(parsedAdvert.name);
      if (parsedAdvert.isValid) {
        cloneElement.textContent = parsedAdvert.data;
      } else {
        cloneElement.remove();
      }
    });
  };

  var toggleFeatures = function (features, parent) {
    var popup = parent.querySelector('.popup__features');
    if (features.length === 0) {
      popup.remove();
      return;
    }

    popup.innerHTML = '';
    features.forEach(function (feature) {
      var li = document.createElement('li');
      var featureClassName = 'popup__feature--' + feature;
      li.classList.add('popup__feature', featureClassName);
      popup.appendChild(li);
    });
  };

  var togglePhotos = function (photos, parent) {
    var photoPopup = parent.querySelector('.popup__photos');
    if (photos.length === 0) {
      photoPopup.remove();
      return;
    }

    photos.forEach(function (photo, index) {
      var image = new Image(IMAGE_WIDTH, IMAGE_HEIGHT);
      image.src = photo;
      image.classList.add('popup__photo');
      image.alt = 'Фотография жилья';

      if (index === 0) {
        var oldImage = parent.querySelector('.popup__photo');
        photoPopup.replaceChild(image, oldImage);
      } else {
        photoPopup.appendChild(image);
      }
    });
  };

  var getCardByIndex = function (index) {
    return cards[index];
  };

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

  window.card = {
    create: createCards,
    get: getCardByIndex,
    close: closeCard,
    init: initCard
  };

})();
