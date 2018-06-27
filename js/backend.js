'use strict';

(function () {
  // var loading = function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  window.load = function (onLoad, onError) {
    window.xhr = new XMLHttpRequest();
    var xhr = window.xhr;

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;

        default:
          onError('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('GET', URL);
    xhr.send();
  };
  // };

  // var uploading = function () {
  //
  //   var URL = 'https://js.dump.academy/keksobooking';
  //
  //   window.upload = function (data, onLoad, onError) {
  //     var xhr = new XMLHttpRequest();
  //     xhr.responseType = 'json';
  //
  //     xhr.addEventListener('load', function () {
  //       onLoad(xhr.response);
  //     });
  //
  //     xhr.addEventListener('error', function () {
  //       onError('Данные заполненв неверно');
  //     });
  //
  //     xhr.open('POST', URL);
  //     xhr.send(data);
  //   };
  // };
  // loading();
  // uploading();
})();
