'use strict';

var mapTemplate = document.querySelector('template').content;
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
var translateFeatures = {
  'wifi': 'WiFi',
  'dishwasher': 'Посудомойка',
  'parking': 'Парковка',
  'washer': 'Стиральная машина',
  'elevator': 'Лифт',
  'conditioner': 'Кондиционер'
};
function getUniqueChoice(currentArray) {
  var index = Math.round(Math.random() * currentArray.length);
  var value = currentArray[index];
  currentArray.splice(index, 1);
  return value;
}

function getRandomChoice(currentArray) {
  return currentArray[Math.round(Math.random() * currentArray.length)];
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
      'features': translateFeatures[featuresChoices.sort(compareRandom).slice(
          getRandomInt(0, featuresChoices.length))],
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

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var fragment = document.createDocumentFragment();
nearestAdverts.forEach(function () {
  var pinHTML = document.createElement('button');
  pinHTML.className = 'map__pin';
  pinHTML.style.left = (advert.location.x - 20) + 'px';
  pinHTML.style.top = (advert.location.y - 40) + 'px';
  pinHTML.src = 'advert.author.avatar';
  pinHTML.alt = 'advert.offer.title';

  fragment.appendChild(pinHTML);
});
document.querySelector('.map__pins').appendChild(fragment);

var getMapElement = function () {
  var clonedElement = mapTemplate.cloneNode(true);
  clonedElement.querySelector('.popup__title').textContent
    = advert.offer.title;
  clonedElement.querySelector('.popup__text--address').textContent
    = advert.offer.address;
  clonedElement.querySelector('.popup__text--price').textContent =
    advert.offer.price + ' ₽/ночь';
  clonedElement.querySelector('.popup__type').textContent = advert.offer.type;
  clonedElement.querySelector('.popup__text--capacity').textContent
    = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
  clonedElement.querySelector('.popup__text--time').textContent
    = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
  clonedElement.querySelector('.popup__features').textContent
    = advert.offer.features;
  clonedElement.querySelector('.popup__description').textContent
    = advert.offer.description;
  clonedElement.querySelector('.popup__photos').textContent = '' ;
  clonedElement.querySelector('.popup__avatar').textContent = advert.author.avatar;
  return clonedElement;
};
nearestAdverts.forEach(function (value) {
  map.appendChild(getMapElement(value));
});
console.log(getMapElement());
