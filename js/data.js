'use strict';
(function () {

  window.data = {'adverts': []};

  var cardTemplate = window.variables.cardTemplate;
  var adverts = window.data.adverts;
  var mapPin = cardTemplate.content.querySelector('.map__pin');
  var PIN_HALF_WIDTH = 20;
  var PIN_HEIGHT = 40;

  var createPins = function (callback) {
    callback();
    var pins = [];
    adverts.forEach(function (advert) {
      var pin = mapPin.cloneNode(true);
      pin.querySelector('img').src = advert.author.avatar;
      pin.style.left
        = (advert.location.x - PIN_HALF_WIDTH) + 'px';
      pin.style.top
        = (advert.location.y - PIN_HEIGHT) + 'px';
      pin.tabIndex = '0';
      pins.push(pin);
    });
    window.pins = {
      create: pins
    };
  };


    // var adverts = [];
    // for (var i = 1; i <= NUMBERS_OF_ADVERTS; i++) {
    //   var locationX = getRandomInt(MIN_X, MAX_X);
    //   var locationY = getRandomInt(MIN_Y, MAX_Y);
    //   var advert = {
    //     'author': {
    //       'avatar': 'img/avatars/user0' + i + '.png'
    //     },
    //     'offer': {
    //       'title': getUniqueItem(titleChoices),
    //       'price': getRandomInt(MIN_PRICE, MAX_PRICE),
    //       'type': TRANSLATE_TYPE[getRandomChoice(TYPES)],
    //       'rooms': getRandomInt(MIN_ROOMS, MAX_ROOMS),
    //       'guests': getRandomInt(MIN_GUESTS, MAX_GUESTS),
    //       'checkin': getRandomChoice(TIMES),
    //       'checkout': getRandomChoice(TIMES),
    //       'features': features.sort(compareRandom).slice(
    //           getRandomInt(0, features.length)),
    //       'description': '',
    //       'photos': PHOTOS.sort(compareRandom)
    //     },
    //     'location': {
    //       'x': locationX,
    //       'y': locationY
    //     }
    //   };
    //   advert.offer.address = locationX + ', ' + locationY;
    //   adverts.push(advert);
    // }
    // return adverts;
  //
  // };
  // var titleChoices = ['Большая уютная квартира', 'Маленькая неуютная квартира',
  //   'Огромный прекрасный дворец', 'Маленький ужасный дворец',
  //   'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
  //   'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  // var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  // var TIMES = ['12:00', '13:00', '14:00'];
  // var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator',
  //   'conditioner'];
  // var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  //   'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  //   'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  // var TRANSLATE_TYPE = {
  //   'palace': 'Дворец',
  //   'flat': 'Квартира',
  //   'house': 'Дом',
  //   'bungalo': 'Бунгало'
  // };
  //
  // var MIN_X = 300;
  // var MAX_X = 900;
  // var MIN_Y = 130;
  // var MAX_Y = 630;
  // var MIN_PRICE = 1000;
  // var MAX_PRICE = window.variables.MAX_PRICE;
  // var MIN_ROOMS = 1;
  // var MAX_ROOMS = 5;
  // var MIN_GUESTS = 1;
  // var MAX_GUESTS = 10;
  // var NUMBERS_OF_ADVERTS = 8;
  //
  // var getUniqueItem = function (currentArray) {
  //   var index = Math.floor(Math.random() * currentArray.length);
  //   var value = currentArray[index];
  //   currentArray.splice(index, 1);
  //   return value;
  // };
  //
  // var getRandomChoice = function (currentArray) {
  //   return currentArray[Math.floor(Math.random() * currentArray.length)];
  // };
  //
  // var getRandomInt = function (min, max) {
  //   return Math.floor(Math.random() * (max - min)) + min;
  // };
  //
  // var compareRandom = function () {
  //   return Math.random() - 0.5;
  // };
  //
  // var createAdverts = function () {
  //   var adverts = [];
  //   for (var i = 1; i <= NUMBERS_OF_ADVERTS; i++) {
  //     var locationX = getRandomInt(MIN_X, MAX_X);
  //     var locationY = getRandomInt(MIN_Y, MAX_Y);
  //     var advert = {
  //       'author': {
  //         'avatar': 'img/avatars/user0' + i + '.png'
  //       },
  //       'offer': {
  //         'title': getUniqueItem(titleChoices),
  //         'price': getRandomInt(MIN_PRICE, MAX_PRICE),
  //         'type': TRANSLATE_TYPE[getRandomChoice(TYPES)],
  //         'rooms': getRandomInt(MIN_ROOMS, MAX_ROOMS),
  //         'guests': getRandomInt(MIN_GUESTS, MAX_GUESTS),
  //         'checkin': getRandomChoice(TIMES),
  //         'checkout': getRandomChoice(TIMES),
  //         'features': features.sort(compareRandom).slice(
  //             getRandomInt(0, features.length)),
  //         'description': '',
  //         'photos': PHOTOS.sort(compareRandom)
  //       },
  //       'location': {
  //         'x': locationX,
  //         'y': locationY
  //       }
  //     };
  //     advert.offer.address = locationX + ', ' + locationY;
  //     adverts.push(advert);
  //   }
  //   return adverts;
  // };
  //
  // window.data = {
  //   adverts: createAdverts()
  // };

})();
