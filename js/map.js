'use strict';

var cardTemplate = document.querySelector('template');
var mapCard = cardTemplate.content.querySelector('.map__card');
var mapPin = cardTemplate.content.querySelector('.map__pin');
var map = document.querySelector('.map');
var mapFiltersContainer = document.querySelector('.map__filters-container');

var cards = [];

var titleChoices = ['Большая уютная квартира', 'Маленькая неуютная квартира',
  'Огромный прекрасный дворец', 'Маленький ужасный дворец',
  'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator',
  'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var TRANSLATE_TYPE = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};
var pinHalfWidth = 20;
var pinHeight = 40;
var minX = 300;
var maxX = 900;
var minY = 130;
var maxY = 630;

function getUniqueItem(currentArray) {
  var index = Math.floor(Math.random() * currentArray.length);
  var value = currentArray[index];
  currentArray.splice(index, 1);
  return value;
}

function getRandomChoice(currentArray) {
  return currentArray[Math.floor(Math.random() * currentArray.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function compareRandom() {
  return Math.random() - 0.5;
}
var createAdverts = function () {
  var adverts = [];
  for (var i = 1; i <= 8; i++) {
    var locationX = getRandomInt(minX, maxX);
    var locationY = getRandomInt(minY, maxY);
    var advert = {
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png'
      },
      'offer': {
        'title': getUniqueItem(titleChoices),
        'price': getRandomInt(1000, 1000000),
        'type': TRANSLATE_TYPE[getRandomChoice(TYPES)],
        'rooms': getRandomInt(1, 5),
        'guests': getRandomInt(1, 10),
        'checkin': getRandomChoice(TIMES),
        'checkout': getRandomChoice(TIMES),
        'features': features.sort(compareRandom).slice(
            getRandomInt(0, features.length)),
        'description': '',
        'photos': PHOTOS.sort(compareRandom)
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    };
    advert.offer.address = locationX + ', ' + locationY;
    adverts.push(advert);
  }
  return adverts;
};

map.classList.remove('map--faded');
var adverts = createAdverts();

var createPins = function () {
  adverts.forEach(function (advert) {
    var pin = mapPin.cloneNode(true);
    pin.querySelector('img').src = advert.author.avatar;
    pin.style.left
      = (advert.location.x - pinHalfWidth) + 'px';
    pin.style.top
      = (advert.location.y - pinHeight) + 'px';
    map.appendChild(pin);
  });
};

var renderCard = function () {
  adverts.forEach(function (advert) {
    var card = mapCard.cloneNode(true);
    card.querySelector('.popup__title').textContent
      = advert.offer.title;
    card.querySelector('.popup__text--address').textContent
      = advert.offer.address;
    card.querySelector('.popup__text--price').textContent =
      advert.offer.price + ' ₽/ночь';
    card.querySelector('.popup__type').textContent = advert.offer.type;
    card.querySelector('.popup__text--capacity').textContent
      = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent
      = 'Заезд после ' + advert.offer.checkin + ', выезд до '
      + advert.offer.checkout;
    addFeatures(card);
    addPhotos(advert.offer.photos, card);
    card.querySelector('.popup__description').textContent
      = advert.offer.description;
    card.querySelector('.popup__avatar').src = advert.author.avatar;
    cards.push(card);
  });
};

var addFeatures = function (parent) {
  var popup = parent.querySelector('.popup__features');
  popup.innerHTML = '';
  adverts[2].offer.features.forEach(function (feature) {
    var li = document.createElement('li');
    var featureClassName = 'popup__feature--' + feature;
    li.classList.add('popup__feature', featureClassName);
    popup.appendChild(li);
  });
};

var addPhotos = function (photos, parent) {
  photos.forEach(function (photo, index) {
    var image = new Image(45, 40);
    image.src = photo;
    image.classList.add('popup__photo');
    image.alt = 'Фотография жилья';
    if (index === 0) {
      var oldImage = parent.querySelector('.popup__photo');
      parent.querySelector('.popup__photos').replaceChild(image, oldImage);
    } else {
      parent.querySelector('.popup__photos').appendChild(image);
    }
  });
};

createPins();
renderCard();

map.insertBefore(cards[0], mapFiltersContainer);
