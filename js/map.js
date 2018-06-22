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

var pinMainSize = 62;
var pinMainArrow = 22;
var pinMainHalfSize = pinMainSize / 2;
var pinMainAll = pinMainSize + pinMainArrow;

var pinMainTop = Number(pinMain.style.top.substr(0, 3));
var pinMainLeft = Number(pinMain.style.left.substr(0, 3));

address.placeholder = (pinMainLeft + pinMainHalfSize) + ', '
  + (pinMainTop + pinMainHalfSize);

var toggleFieldsetsVisability = function (state) {
  fieldsets.forEach(function (fieldset) {
    fieldset.disabled = state;
  });
};

toggleFieldsetsVisability(true);

var closeCard = function () {
  var close = map.querySelector('.popup__close');
  if (!close) {
    return;
  }

  close.parentElement.remove();
  close.removeEventListener('click', onCloseClick);
  document.removeEventListener('keydown', onCloseClick);
};

var onCloseClick = function () {
  closeCard();
};

var onCloseKeydown = function (evt) {
  if (evt.keyCode === 27 || evt.keyCode === 13) {
    closeCard();
  }
};

var initCard = function () {
  var close = map.querySelector('.popup__close');
  close.focus();

  close.addEventListener('click', onCloseClick);
  document.addEventListener('keydown', onCloseKeydown);
};

var onPinClick = function (index) {
  var popup = map.querySelector('.popup');
  if (popup) {
    popup.remove();
  }

  map.insertBefore(cards[index], mapFiltersContainer);
  initCard();
};

var renderPins = function () {
  pins.forEach(function (pin, index) {
    map.appendChild(pin);
    pin.addEventListener('click', onPinClick.bind(null, index));
  });
};

var removePins = function () {
  pins.forEach(function (pin) {
    map.removeChild(pin);
  });
};

var clickOnPinMain = function () {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  setDefaultValues();
  toggleFieldsetsVisability(false);
  renderPins();
};

var onPinMainMouseDown = function (evt) {
  evt.preventDefault();
  var dragged = false;

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onPinMainMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    var minTop = 130 - (pinMainHalfSize + pinMainArrow);
    var maxTop = 630 - (pinMainHalfSize + pinMainArrow);
    var pinMinGridX = map.offsetLeft + pinMainHalfSize;
    var pinMaxGridX = map.offsetLeft + map.clientWidth - pinMainHalfSize;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };
    var pinStyleLeft = evt.clientX - shift.x;
    var pinStyleTop = evt.clientY - shift.y;

    if (pinStyleTop >= minTop &&
        pinStyleTop <= maxTop &&
        pinStyleLeft > pinMinGridX &&
        pinStyleLeft < pinMaxGridX) {
      pinMain.style.left = (pinStyleLeft - map.offsetLeft - pinMainHalfSize) + 'px';
      pinMain.style.top = (pinStyleTop - pinMainHalfSize) + 'px';
      address.value = (pinStyleLeft - map.offsetLeft) + ', '
        + (pinStyleTop + pinMainHalfSize + pinMainArrow);
    }
  };

  var onPinMainMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onPinMainMouseMove);
    document.removeEventListener('mouseup', onPinMainMouseUp);

    if (dragged) {
      clickOnPinMain();
      pinMain.style.left = pinMain.offsetLeft + 'px';
      pinMain.style.top = pinMain.offsetTop + 'px';
      address.value = (pinMain.offsetLeft + pinMainHalfSize) + ', '
        + (pinMain.offsetTop + pinMainAll);
    }
  };
  document.addEventListener('mousemove', onPinMainMouseMove);
  document.addEventListener('mouseup', onPinMainMouseUp);
};
pinMain.addEventListener('mousedown', onPinMainMouseDown);

// modeule4-task2
var title = form.elements.title;
var price = form.elements.price;
var selectType = form.elements.type;
var selectTimeIn = form.elements.timein;
var selectTimeOut = form.elements.timeout;
var roomFieldset = form.elements.rooms;
var capacity = form.elements.capacity;
var submitBtn = form.querySelector('.ad-form__submit');
var reset = document.querySelector('.ad-form__reset');

var priceOptions = Array.from(selectType.options);
var capacityOptions = Array.from(capacity.options);

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
  setPriceValues();
  setRoomValues();
};

var setPriceValues = function () {
  priceOptions.forEach(function (option, index) {
    if (option.selected) {
      price.min = MIN_PRICES[index];
      price.placeholder = MIN_PRICES[index];
    }
  });
};

var onSelectTypeChange = function () {
  setPriceValues();
};
selectType.addEventListener('change', onSelectTypeChange);

var onOptionTimeInChange = function (evt) {
  selectTimeOut.selectedIndex = evt.target.selectedIndex;
};
selectTimeIn.addEventListener('change', onOptionTimeInChange);

var onOptionTimeOutChange = function (evt) {
  selectTimeIn.selectedIndex = evt.target.selectedIndex;
};
selectTimeOut.addEventListener('change', onOptionTimeOutChange);

var setRoomValues = function () {
  var room = roomFieldset.options[roomFieldset.selectedIndex].value;
  var selectedValues = roomsCapacity[room];
  capacityOptions.forEach(function (option) {
    if (selectedValues.includes(option.value)) {
      option.disabled = false;
      option.selected = true;
    } else {
      option.selected = false;
      option.disabled = true;
    }
  });
};

var onRoomFieldsetChange = function () {
  setRoomValues();
};
roomFieldset.addEventListener('change', onRoomFieldsetChange);

var resetForm = function () {
  var invalidInputs = form.querySelectorAll('.invalid');
  if (invalidInputs) {
    invalidInputs.forEach(function (input) {
      input.classList.remove('invalid');
    });
  }

  form.reset();
};
var onResetClick = function () {
  map.classList.add('map--faded');
  form.classList.add('ad-form--disabled');
  toggleFieldsetsVisability(true);
  removePins();
  closeCard();
  resetForm();
};
reset.addEventListener('click', onResetClick);

var onSubmitBtnClick = function () {
  var inputs = form.querySelectorAll('input:required');
  inputs.forEach(function (input) {
    if (!input.validity.valid) {
      input.classList.add('invalid');
    } else {
      input.classList.remove('invalid');
    }
  });
};
submitBtn.addEventListener('click', onSubmitBtnClick);
