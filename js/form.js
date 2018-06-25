'use strict';

(function () {
  var form = window.variables.form;
  var address = window.variables.address;
  var mainPinHalfSize = window.controlMainPin.pinMainHalfSize;
  var deactivateMap = window.controlMainPin.deactivateMap;
  var pinMain = window.variables.pinMain;
  var maxPrice = window.variables.maxPrice;

  var submitBtn = form.querySelector('.ad-form__submit');
  var reset = document.querySelector('.ad-form__reset');

  var title = form.elements.title;
  var price = form.elements.price;
  var selectType = form.elements.type;
  var selectTimeIn = form.elements.timein;
  var selectTimeOut = form.elements.timeout;
  var roomFieldset = form.elements.rooms;
  var capacity = form.elements.capacity;
  var priceOptions = Array.from(selectType.options);
  var capacityOptions = Array.from(capacity.options);

  var pinMainTop = Number(pinMain.style.top.substr(0, 3));
  var pinMainLeft = Number(pinMain.style.left.substr(0, 3));

  var MIN_LENGTH = 30;
  var MAX_LENGTH = 100;
  var MIN_PRICES = [0, 1000, 5000, 10000];
  var roomsCapacity = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  address.placeholder = (pinMainLeft + mainPinHalfSize) + ', '
    + (pinMainTop + mainPinHalfSize);

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

  var setDefaultValues = function () {
    title.minLength = MIN_LENGTH;
    title.maxLength = MAX_LENGTH;
    title.required = true;
    title.type = 'text';

    price.required = true;
    price.type = 'number';
    price.max = maxPrice;

    address.readOnly = true;

    setPriceValues();
    setRoomValues();
  };

  setDefaultValues();

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
    deactivateMap();
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

})();
