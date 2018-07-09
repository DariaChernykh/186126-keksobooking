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
  var fileChooserAvatar = document.querySelector('.ad-form-header__input');
  var previewAvatar = document.querySelector('.ad-form-header__preview');
  var container = document.querySelector('.ad-form__photo-container');
  var previewPhoto = container.querySelector('.ad-form__photo');
  var fileChooserPhoto = container.querySelector('.ad-form__input');

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

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_URL = 'img/muffin-grey.svg';
  var PHOTO_WIDTH = '40px';
  var PHOTO_HEIGHT = '44px';
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
    address.placeholder = (pinMainLeft + PIN_MAIN_HALF_SIZE) + ', '
      + (pinMainTop + PIN_MAIN_HALF_SIZE);

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

  setDefaultValues();

  var resetForm = function () {
    form.reset();

    var invalidInputs = form.querySelectorAll('.invalid');
    if (invalidInputs) {
      invalidInputs.forEach(function (input) {
        input.classList.remove('invalid');
      });
    }
    removePhoto();
    removeListeners();
    setDefaultValues();
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

  var onSuccess = function () {
    window.main.restore();
    resetForm();
    success.classList.remove('hidden');

    success.addEventListener('click', onSuccessClick);
    document.addEventListener('keydown', onSuccessKeydown);
  };

  var onError = function (response) {
    window.showPopup(response);
  };

  var onSubmitButtonClick = function () {
    if (form.checkValidity()) {
      window.backend.upload(new FormData(form), onSuccess, onError);
    } else {
      checkForm();
    }
  };

  var checkFile = function (file) {
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    return matches;
  };

  var addImage = function (url, image) {
    if (checkFile(url)) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        image.src = reader.result;
      });
      reader.readAsDataURL(url);
    }
  };

  var onFileChooserAvatarChange = function () {
    var file = fileChooserAvatar.files[0];
    var patternPhoto = previewAvatar.querySelector('img');

    addImage(file, patternPhoto);
  };

  var createPhoto = function () {
    var createdPhoto = document.createElement('img');
    createdPhoto.style.width = PHOTO_WIDTH;
    createdPhoto.style.height = PHOTO_HEIGHT;
    return createdPhoto;
  };

  var onFileChooserPhoto = function () {
    var photos = Array.from(fileChooserPhoto.files);
    photos.forEach(function (photo) {
      var clonedPreview = previewPhoto.cloneNode(true);
      var patternPhoto = createPhoto();
      clonedPreview.appendChild(patternPhoto);

      addImage(photo, patternPhoto);
      container.insertBefore(clonedPreview, previewPhoto);
    });
  };

  var removePhoto = function () {
    var imageToDelete = previewAvatar.querySelector('img');
    imageToDelete.src = DEFAULT_URL;

    var currentPhotos = Array.from(container.
      querySelectorAll('.ad-form__photo'));
    currentPhotos.forEach(function (photo) {
      if (currentPhotos[currentPhotos.length - 1] !== photo) {
        photo.remove();
      }
    });
  };

  var addListeners = function () {
    resetButton.addEventListener('click', onResetClick);
    submitButton.addEventListener('click', onSubmitButtonClick);
    roomFieldset.addEventListener('change', onRoomFieldsetChange);
    selectTimeOut.addEventListener('change', onOptionTimeOutChange);
    selectTimeIn.addEventListener('change', onOptionTimeInChange);
    selectType.addEventListener('change', onSelectTypeChange);
    fileChooserAvatar.addEventListener('change', onFileChooserAvatarChange);
    fileChooserPhoto.addEventListener('change', onFileChooserPhoto);
  };

  var removeListeners = function () {
    submitButton.removeEventListener('click', onSubmitButtonClick);
    resetButton.removeEventListener('click', onResetClick);
    roomFieldset.removeEventListener('change', onRoomFieldsetChange);
    selectTimeOut.removeEventListener('change', onOptionTimeOutChange);
    selectTimeIn.removeEventListener('change', onOptionTimeInChange);
    selectType.removeEventListener('change', onSelectTypeChange);
    fileChooserAvatar.removeEventListener('change', onFileChooserAvatarChange);
    fileChooserPhoto.removeEventListener('change', onFileChooserPhoto);
  };

  window.form = {
    addListeners: addListeners,
  };

})();
