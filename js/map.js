'use strict';

var cardTemplate = document.querySelector('template').content;
var map = document.querySelector('.map');
var mapFiltersContainer = document.querySelector('.map__filters-container');
var nearestAdverts = [];

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира',
  'Огромный прекрасный дворец', 'Маленький ужасный дворец',
  'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator',
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

for (var i = 1; i <= 8; i++) {
  var locationX = getRandomInt(300, 900);
  var locationY = getRandomInt(130, 630);
  var advert = {
    'author': {
      'avatar': 'img/avatars/user0' + i + '.png'
    },
    'offer': {
      'title': getUniqueItem(TITLES),
      'price': getRandomInt(1000, 1000000),
      'type': TRANSLATE_TYPE[getRandomChoice(TYPES)],
      'rooms': getRandomInt(1, 5),
      'guests': getRandomInt(1, 10),
      'checkin': getRandomChoice(TIMES),
      'checkout': getRandomChoice(TIMES),
      'features': FEATURES.sort(compareRandom).slice(
          getRandomInt(0, FEATURES.length)),
      'description': '',
      'photos': PHOTOS.sort(compareRandom)
    },
    'location': {
      'x': locationX,
      'y': locationY
    }
  };
  advert.offer.address = locationX + ', ' + locationY;
  nearestAdverts.push(advert);
}

map.classList.remove('map--faded');

var getMapElement = function (element) {
  var clonedElement = cardTemplate.cloneNode(true);
  clonedElement.querySelector('.popup__title').textContent
    = element.offer.title;
  clonedElement.querySelector('.popup__text--address').textContent
    = element.offer.address;
  clonedElement.querySelector('.popup__text--price').textContent =
    element.offer.price + ' ₽/ночь';
  clonedElement.querySelector('.popup__type').textContent = element.offer.type;
  clonedElement.querySelector('.popup__text--capacity').textContent
    = element.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
  clonedElement.querySelector('.popup__text--time').textContent
    = 'Заезд после ' + advert.offer.checkin + ', выезд до '
    + element.offer.checkout;
  clonedElement.querySelector('.popup__features').textContent
    = element.offer.features;
  clonedElement.querySelector('.popup__description').textContent
    = element.offer.description;
  clonedElement.querySelector('.popup__photo').src = element.offer.photos[0];

  for (i = 1; i < element.offer.photos.length; i++) {
    var image = new Image(45, 40);
    image.src = element.offer.photos[i];
    image.classList.add('popup__photo');
    image.setAttribute('alt', 'Фотография жилья');
    clonedElement.querySelector('.popup__photos').appendChild(image);
  }

  clonedElement.querySelector('.popup__avatar').src = element.author.avatar;
  clonedElement.querySelector('.map__pin img').src = element.author.avatar;
  clonedElement.querySelector('.map__pin').style.left
    = (element.location.x - pinHalfWidth) + 'px';
  clonedElement.querySelector('.map__pin').style.top
    = (element.location.y - pinHeight) + 'px';
  return clonedElement;
};

nearestAdverts.forEach(function (element) {
  map.insertBefore(getMapElement(element), mapFiltersContainer);
});
