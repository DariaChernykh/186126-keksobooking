'use strict';
(function () {

  var error = document.querySelector('.error');
  var errorMessage = document.querySelector('.error__message');

  var TIME_TO_CLOSE = 5000;

  var showPopup = function (response) {
    error.classList.remove('hidden');
    errorMessage.textContent = response;

    setTimeout(closePopup, TIME_TO_CLOSE);
  };

  var closePopup = function () {
    error.classList.add('hidden');
  };

  window.showPopup = showPopup;

})();
