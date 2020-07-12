'use strict';

window.pin = (function () {

  return {
    create: function (database) {
      var pinTemplate = document.querySelector('#pin').content;
      var pinButton = pinTemplate.querySelector('.map__pin');
      var pinFragment = document.createDocumentFragment();

      var createPin = function (data) {
        var pin = pinButton.cloneNode(true);
        var pinImage = pin.querySelector('img');
        pin.style = 'left: ' + (data.location.x - window.constants.PIN_WIDTH / 2) + 'px; top: ' + (data.location.y - window.constants.PIN_HEIGHT) + 'px;';
        pinImage.src = data.author.avatar;
        pinImage.alt = data.offer.title;
        return pin;
      };

      var addPin = function (newPin) {
        pinFragment.appendChild(newPin);
      };

      database.forEach(function (item) {
        var mapPin = createPin(item);
        addPin(mapPin);
      });

      return pinFragment;
    }
  };
})();
