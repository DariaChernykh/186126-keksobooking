'use strict';

var cardTemplate = document.querySelector('template');
var mapCard = cardTemplate.content.querySelector('.map__card');
var mapPin = cardTemplate.content.querySelector('.map__pin');
var map = document.querySelector('.map');
var mapFiltersContainer = document.querySelector('.map__filters-container');
var nearestAdverts = [];
var renderAds = [];

var titleChoices = ['Большая уютная квартира', 'Маленькая неуютная квартира',
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
      'title': getUniqueItem(titleChoices),
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

nearestAdverts.forEach(function (element) {
  var clonedPin = mapPin.cloneNode(true);
  clonedPin.querySelector('img').src = element.author.avatar;
  clonedPin.style.left
    = (element.location.x - pinHalfWidth) + 'px';
  clonedPin.style.top
    = (element.location.y - pinHeight) + 'px';
  map.appendChild(clonedPin);
});

nearestAdverts.forEach(function (element) {
  var clonedCard = mapCard.cloneNode(true);
  clonedCard.querySelector('.popup__title').textContent
    = element.offer.title;
  clonedCard.querySelector('.popup__text--address').textContent
    = element.offer.address;
  clonedCard.querySelector('.popup__text--price').textContent =
    element.offer.price + ' ₽/ночь';
  clonedCard.querySelector('.popup__type').textContent = element.offer.type;
  clonedCard.querySelector('.popup__text--capacity').textContent
    = element.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
  clonedCard.querySelector('.popup__text--time').textContent
    = 'Заезд после ' + advert.offer.checkin + ', выезд до '
    + element.offer.checkout;

  clonedCard.querySelectorAll('.popup__features li').forEach(function (object) {
    var itemPrefix = 'popup__feature--';
    var item = object.classList[1].replace(itemPrefix, '');
    if (!element.offer.features.includes(item)) {
      clonedCard.querySelector('.' + itemPrefix + item).remove();
    }
  });

  clonedCard.querySelector('.popup__description').textContent
    = element.offer.description;
  clonedCard.querySelector('.popup__photo').src = element.offer.photos[0];

  for (i = 1; i < element.offer.photos.length; i++) {
    var image = new Image(45, 40);
    image.src = element.offer.photos[i];
    image.classList.add('popup__photo');
    image.setAttribute('alt', 'Фотография жилья');
    clonedCard.querySelector('.popup__photos').appendChild(image);
  }
  clonedCard.querySelector('.popup__avatar').src = element.author.avatar;
  renderAds.push(clonedCard);
});

map.insertBefore(renderAds[0], mapFiltersContainer);
