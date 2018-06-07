'use strict';

var nearestAds = [];

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
      'type': getRandomChoice(typeChoices),
      'rooms': getRandomInt(1, 5),
      'guests': getRandomInt(1, 10),
      'checkin': getRandomChoice(timeChoices),
      'checkout': getRandomChoice(timeChoices),
      'features': featuresChoices.sort(compareRandom).slice(
          getRandomInt(0, featuresChoices.length)
      ),
      'description': '',
      'photos': photosChoices.sort(compareRandom)
    },
    'location': {
      'x': getRandomInt(300, 900),
      'y': getRandomInt(130, 630)
    }
  };
  advert.offer.address = advert.location.x + ', ' + advert.location.y;
  nearestAds.push(advert);
}

var map = document.querySelector('.map');
map.classList.remove('mar--faded');

var fragment = document.createDocumentFragment();

nearestAds.forEach(function () {
  var pinHTML = document.createElement('button');
  pinHTML.className = 'map__pin';
  pinHTML.style.left = advert.location.x - 20;
  pinHTML.style.top = advert.location.y - 40;
  pinHTML.src = 'advert.author.avatar';
  pinHTML.alt = 'advert.offer.title';

  fragment.appendChild(pinHTML);
});
map.appendChild(fragment);
