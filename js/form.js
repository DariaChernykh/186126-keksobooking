'use strict';

(function () {

  var form = window.variables.form;
  var address = window.variables.address;
  var pinMain = window.variables.pinMain;
  var PIN_MAIN_HALF_SIZE = window.variables.PIN_MAIN_HALF_SIZE;
  var ESC_CODE = window.variables.ESC_CODE;

  var submitButton = form.querySelector('.ad-form__submit');
  var resetButton = form.querySelector('.ad-form__reset');
  var success = document.querySelector('.success');

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

  var MAX_PRICE = 1000000;
  var MIN_LENGTH = 30;
  var MAX_LENGTH = 100;
  var MIN_PRICES = [0, 1000, 5000, 10000];
  var roomsCapacity = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  address.placeholder = (pinMainLeft + PIN_MAIN_HALF_SIZE) + ', '
    + (pinMainTop + PIN_MAIN_HALF_SIZE);

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

  var onOptionTimeInChange = function (evt) {
    selectTimeOut.selectedIndex = evt.target.selectedIndex;
  };

  var onOptionTimeOutChange = function (evt) {
    selectTimeIn.selectedIndex = evt.target.selectedIndex;
  };

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
    window.main.restore();
    resetForm();
  };

  var closeSuccess = function () {
    success.classList.add('hidden');

    success.removeEventListener('click', onSuccessClick);
    document.removeEventListener('keydown', onSuccessKeydown);
  };

  var onSuccessClick = function () {
    closeSuccess();
  };

  var onSuccessKeydown = function (evt) {
    if (evt.keyCode === ESC_CODE) {
      closeSuccess();
    }
  };

  var checkForm = function () {
    var inputs = form.querySelectorAll('input:required');
    inputs.forEach(function (input) {
      if (!input.validity.valid) {
        input.classList.add('invalid');
      } else {
        input.classList.remove('invalid');
      }
    });
  };

  var successHandler = function () {
    window.main.restore();
    resetForm();
    success.classList.remove('hidden');

    success.addEventListener('click', onSuccessClick);
    document.addEventListener('keydown', onSuccessKeydown);
  };

  var errorHandler = function (response) {
    window.showPopup(response);
  };

  var onSubmitButtonClick = function (evt) {
    evt.preventDefault();
    if (form.checkValidity()) {
      window.backend.upload(new FormData(form), successHandler, errorHandler);
    } else {
      checkForm();
    }
  };

  var addListeners = function () {
    resetButton.addEventListener('click', onResetClick);
    submitButton.addEventListener('click', onSubmitButtonClick);
    roomFieldset.addEventListener('change', onRoomFieldsetChange);
    selectTimeOut.addEventListener('change', onOptionTimeOutChange);
    selectTimeIn.addEventListener('change', onOptionTimeInChange);
    selectType.addEventListener('change', onSelectTypeChange);
  };

  var removeListeners = function () {
    submitButton.removeEventListener('click', onSubmitButtonClick);
    resetButton.removeEventListener('click', onResetClick);
    roomFieldset.removeEventListener('change', onRoomFieldsetChange);
    selectTimeOut.removeEventListener('change', onOptionTimeOutChange);
    selectTimeIn.removeEventListener('change', onOptionTimeInChange);
    selectType.removeEventListener('change', onSelectTypeChange);
  };

  window.form = {
    addListeners: addListeners,
    removeListeners: removeListeners
  };

})();
