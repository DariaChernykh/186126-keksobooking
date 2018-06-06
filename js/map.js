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

function getUniqueChoice(arr) {
  var index = Math.round(Math.random() * arr.length);
  var value = arr[index];
  arr.splice(index, 1);
  return value;
}

function getRandomChoice(arr) {
  return arr[Math.round(Math.random() * arr.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function compareRandom() {
  return Math.random() - 0.5;
}

for (var i = 1; i <= 8; i++) {
  var ad = {
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
  ad.offer.address = ad.location.x + ', ' + ad.location.y;
  nearestAds.push(ad);
}

console.log(nearestAds);
document.querySelector('.map').classList.remove('mar--faded');
