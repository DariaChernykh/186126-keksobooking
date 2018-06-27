'use strict';
(function () {
  var adverts = [];
  var successHandler = function (array) {
    for (var i = 0; i < array.length; i++) {
      var advert = {
        'author': {
          'avatar': array[i].author.avatar,
        },
        'offer': {
          'title': array[i].offer.title,
          'address': array[i].offer.address,
          'price': array[i].offer.price,
          'type': array[i].offer.type,
          'rooms': array[i].offer.rooms,
          'guests': array[i].offer.guests,
          'checkin': array[i].offer.checkin,
          'checkout': array[i].offer.checkout,
          'features': array[i].offer.features,
          'description': array[i].offer.description,
          'photos': array[i].offer.photos
        },
        'location': {
          'x': array[i].location.x,
          'y': array[i].location.y
        }
      };
      adverts.push(advert);
    }
    return adverts;
  };
  window.data = {
    adverts: adverts,
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

  var errorHandler = function () {

  };

  window.load(successHandler, errorHandler);

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
