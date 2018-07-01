'use strict';

(function () {

  var cardTemplate = window.variables.cardTemplate;
  var mapCard = cardTemplate.content.querySelector('.map__card');

  var IMAGE_WIDTH = 45;
  var IMAGE_HEIGHT = 40;
  var TRANSLATE_TYPE = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var cards = [];

  var createCards = function (array) {

    array.forEach(function (advert) {
      var card = mapCard.cloneNode(true);
      card.querySelector('.popup__title').textContent
        = advert.offer.title;
      card.querySelector('.popup__text--address').textContent
        = advert.offer.address;
      card.querySelector('.popup__text--price').textContent =
        advert.offer.price + ' ₽/ночь';
      card.querySelector('.popup__type').textContent = TRANSLATE_TYPE[advert.offer.type];
      card.querySelector('.popup__text--capacity').textContent
        = advert.offer.rooms + ' комнаты для ' + advert.offer.guests +
        ' гостей';
      card.querySelector('.popup__text--time').textContent
        = 'Заезд после ' + advert.offer.checkin + ', выезд до '
        + advert.offer.checkout;
      card.querySelector('.popup__description').textContent
        = advert.offer.description;
      card.querySelector('.popup__avatar').src = advert.author.avatar;

      addFeatures(advert.offer.features, card);
      addPhotos(advert.offer.photos, card);

      cards.push(card);
    });
  };

  var addFeatures = function (sortedFeatures, parent) {
    var popup = parent.querySelector('.popup__features');
    popup.innerHTML = '';
    sortedFeatures.forEach(function (feature) {
      var li = document.createElement('li');
      var featureClassName = 'popup__feature--' + feature;
      li.classList.add('popup__feature', featureClassName);
      popup.appendChild(li);
    });
  };

  var addPhotos = function (photos, parent) {
    var photoPopup = parent.querySelector('.popup__photos');
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

  window.cards = {
    create: createCards,
    get: getCardByIndex
  };

})();
