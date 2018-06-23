'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var fieldsets = document.querySelectorAll('.ad-form__element');
  var address = document.getElementById('address');

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

  var pinMainTop = Number(window.map.pinMain.style.top.substr(0, 3));
  var pinMainLeft = Number(window.map.pinMain.style.left.substr(0, 3));

  var MIN_LENGTH = 30;
  var MAX_LENGTH = 100;
  var MIN_PRICES = [0, 1000, 5000, 10000];
  var roomsCapacity = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  address.placeholder = (pinMainLeft + window.map.pinMainHalfSize) + ', '
    + (pinMainTop + window.map.pinMainHalfSize);

  var toggleFieldsetsVisability = function (state) {
    fieldsets.forEach(function (fieldset) {
      fieldset.disabled = state;
    });
    return (toggleFieldsetsVisability);
  };

  toggleFieldsetsVisability(true);

  var setDefaultValues = function () {
    title.minLength = MIN_LENGTH;
    title.maxLength = MAX_LENGTH;
    title.required = true;
    title.type = 'text';

    price.required = true;
    price.type = 'number';
    price.max = window.data.maxPrice;

    address.readOnly = true;
    setPriceValues();
    setRoomValues();
    return (setDefaultValues);
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
    window.card.map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
    toggleFieldsetsVisability(true);
    window.card.removePins();
    window.card.closeCard();
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

  window.form = {
    form: form,
    address: address,
    setDefaultValues: setDefaultValues(),
    toggleFieldsetsVisability: toggleFieldsetsVisability()
  };
})();
