'use strict';

var cardTemplate = document.querySelector('template');
var mapCard = cardTemplate.content.querySelector('.map__card');
var mapPin = cardTemplate.content.querySelector('.map__pin');
var map = document.querySelector('.map');
var mapFiltersContainer = document.querySelector('.map__filters-container');

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
var PIN_HALF_WIDTH = 20;
var PIN_HEIGHT = 40;
var MIN_X = 300;
var MAX_X = 900;
var MIN_Y = 130;
var MAX_Y = 630;
var IMAGE_WIDTH = 45;
var IMAGE_HEIGHT = 40;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_GUESTS = 1;
var MAX_GUESTS = 10;
var NUMBERS_OF_ADVERTS = 8;

var cards = [];
var pins = [];

var getUniqueItem = function (currentArray) {
  var index = Math.floor(Math.random() * currentArray.length);
  var value = currentArray[index];
  currentArray.splice(index, 1);
  return value;
};

var getRandomChoice = function (currentArray) {
  return currentArray[Math.floor(Math.random() * currentArray.length)];
};

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var compareRandom = function () {
  return Math.random() - 0.5;
};

var createAdverts = function () {
  var adverts = [];
  for (var i = 1; i <= NUMBERS_OF_ADVERTS; i++) {
    var locationX = getRandomInt(MIN_X, MAX_X);
    var locationY = getRandomInt(MIN_Y, MAX_Y);
    var advert = {
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png'
      },
      'offer': {
        'title': getUniqueItem(titleChoices),
        'price': getRandomInt(MIN_PRICE, MAX_PRICE),
        'type': TRANSLATE_TYPE[getRandomChoice(TYPES)],
        'rooms': getRandomInt(MIN_ROOMS, MAX_ROOMS),
        'guests': getRandomInt(MIN_GUESTS, MAX_GUESTS),
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
      = (advert.location.x - PIN_HALF_WIDTH) + 'px';
    pin.style.top
      = (advert.location.y - PIN_HEIGHT) + 'px';
    pin.tabIndex = '0';
    pins.push(pin);
  });
  return pins;
};

var createCards = function () {
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

createPins();
createCards();

// modeule4-task1

var form = document.querySelector('.ad-form');
var fieldsets = document.querySelectorAll('.ad-form__element');
var pinMain = document.querySelector('.map__pin--main');
var address = document.getElementById('address');

var PIN_MAIN_SIZE = 62;
var PIN_MAIN_ARROW = 22;
var PIN_MAIN_HALF_SIZE = PIN_MAIN_SIZE / 2;

var pinMainTop = Number(pinMain.style.top.substr(0, 3));
var pinMainLeft = Number(pinMain.style.left.substr(0, 3));

map.classList.add('map--faded');

address.placeholder = (pinMainLeft + PIN_MAIN_HALF_SIZE) + ', '
  + (pinMainTop + PIN_MAIN_HALF_SIZE);

var toggleFieldsetsVisability = function (state) {
  fieldsets.forEach(function (fieldset) {
    fieldset.disabled = state;
  });
};

toggleFieldsetsVisability(true);

var onPinClick = function (index) {
  var popup = map.querySelector('.popup');
  if (popup) {
    popup.remove();
  }

  map.insertBefore(cards[index], mapFiltersContainer);

  var close = map.querySelector('.popup__close');
  var onCloseClick = function () {
    map.removeChild(cards[index]);
  };

  close.addEventListener('click', onCloseClick);
};

var renderPins = function () {
  pins.forEach(function (pin, index) {
    map.appendChild(pin);
    pin.addEventListener('click', onPinClick.bind(null, index));
  });
};

var onPinMainClick = function () {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  address.value = (pinMainLeft + PIN_MAIN_HALF_SIZE) + ', '
    + (pinMainTop + PIN_MAIN_SIZE + PIN_MAIN_ARROW);

  toggleFieldsetsVisability(false);
  renderPins();
};

pinMain.addEventListener('mouseup', onPinMainClick);

// modeule4-task2
var title = form.elements.title;
var price = form.elements.price;
var selectType = form.elements.type;
var selectTimeIn = form.elements.timein;
var selectTimeOut = form.elements.timeout;
var rooms = form.elements.rooms;
var capacity = form.elements.capacity;

var priceOption = Array.from(selectType.options);
var capacityOption = Array.from(capacity.options);
var sendButton = document.querySelector('.ad-form__submit');
var inputs = document.querySelectorAll('input');

var MIN_LENGTH = 30;
var MAX_LENGTH = 100;
var MIN_PRICES = [0, 1000, 5000, 10000];
var roomsCapacity = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

var setDefaultValues = function () {
  title.minLength = MIN_LENGTH;
  title.maxLength = MAX_LENGTH;
  title.required = true;
  title.type = 'text';

  price.required = true;
  price.type = 'number';
  price.max = MAX_PRICE;

  address.readOnly = true;
};

setDefaultValues();

var onSelectorChange = function () {
  priceOption.forEach(function (option, index) {
    if (option.selected) {
      price.min = MIN_PRICES[index];
      price.placeholder = MIN_PRICES[index];
    }
  });
};

onSelectorChange(priceOption.selectedIndex);
selectType.addEventListener('change', onSelectorChange);

var onOptionTimeInChange = function (evt) {
  selectTimeOut.selectedIndex = evt.target.selectedIndex;
};
var onOptionTimeOutChange = function (evt) {
  selectTimeIn.selectedIndex = evt.target.selectedIndex;
};

selectTimeIn.addEventListener('change', onOptionTimeInChange);
selectTimeOut.addEventListener('change', onOptionTimeOutChange);

var chooseRoom = function () {
  var room = rooms.options[rooms.selectedIndex].value;
  var selectedValues = roomsCapacity[room];
  capacityOption.forEach(function (option) {
    if (selectedValues.includes(option.value)) {
      option.disabled = false;
      option.selected = true;
    } else {
      option.selected = false;
      option.disabled = true;
    }
  });
};

chooseRoom();
rooms.addEventListener('change', chooseRoom);

var onSendButtonClick = function () {
  inputs.forEach(function (input) {
    if (input.validity.valueMissing) {
      input.setCustomValidity('Fill this field');
    } else if (input.validity.tooShort) {
      input.setCustomValidity('This should be longer than ' + input.minLength);
    } else if (input.validity.rangeUnderflow) {
      input.setCustomValidity('This should be greater than' + input.min);
    } else if (input.validity.rangeOverflow) {
      input.setCustomValidity('This should be less then ' + input.max);
    } else {
      input.setCustomValidity('');
    }
  });
};

sendButton.addEventListener('click', onSendButtonClick);
