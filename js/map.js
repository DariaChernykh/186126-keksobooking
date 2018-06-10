'use strict';

var mapTemplate = document.querySelector('template').content;
var map = document.querySelector('.map');
var mapFiltersContainer = document.querySelector('.map__filters-container');
var nearestAdverts = [];

var titleChoices = ['Большая уютная квартира', 'Маленькая неуютная квартира',
  'Огромный прекрасный дворец', 'Маленький ужасный дворец',
  'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var typeChoices = ['palace', 'flat', 'house', 'bungalo'];
var timeChoices = ['12:00', '13:00', '14:00'];
var featuresChoices = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator',
  'conditioner'];
var photosChoices = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var translateType = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

function getUniqueChoice(currentArray) {
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
  var advert = {
    'author': {
      'avatar': 'img/avatars/user0' + i + '.png'
    },
    'offer': {
      'title': getUniqueChoice(titleChoices),
      'price': getRandomInt(1000, 1000000),
      'type': translateType[getRandomChoice(typeChoices)],
      'rooms': getRandomInt(1, 5),
      'guests': getRandomInt(1, 10),
      'checkin': getRandomChoice(timeChoices),
      'checkout': getRandomChoice(timeChoices),
      'features': featuresChoices.sort(compareRandom).slice(
          getRandomInt(0, featuresChoices.length)),
      'description': '',
      'photos': photosChoices.sort(compareRandom)
    },
    'location': {
      'x': getRandomInt(300, 900),
      'y': getRandomInt(130, 630)
    }
  };
  advert.offer.address = advert.location.x + ', ' + advert.location.y;
  nearestAdverts.push(advert);
}

map.classList.remove('map--faded');

var getMapElement = function (element) {
  var clonedElement = mapTemplate.cloneNode(true);
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

  element.offer.photos.forEach(function (value) {
    var img = clonedElement.querySelector('.popup__photo').cloneNode(true);
    img.src = value;
    clonedElement.querySelector('.popup__photos').append(img);
  });

  clonedElement.querySelector('.popup__photo').remove();
  clonedElement.querySelector('.popup__avatar').src = element.author.avatar;
  clonedElement.querySelector('.map__pin').firstElementChild.src
    = element.author.avatar;
  clonedElement.querySelector('.map__pin').style.left
    = (element.location.x - 20) + 'px';
  clonedElement.querySelector('.map__pin').style.top
    = (element.location.y - 40) + 'px';
  return clonedElement;
};

nearestAdverts.forEach(function (element) {
  map.insertBefore(getMapElement(element), mapFiltersContainer);
});
