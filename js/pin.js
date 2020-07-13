'use strict';

window.pin = (function () {

  return {
<<<<<<< HEAD
    create: function(database) {
=======
    create: function (database) {
>>>>>>> 9dc7e1b1840e64a1aef13cc716b109e888987194
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

<<<<<<< HEAD
      for (var i = 0; i < database.length; i++) {
        var mapPin = createPin(database[i]);
        addPin(mapPin);
      }

      return pinFragment;
    }
  }
=======
      database.forEach(function (item) {
        var mapPin = createPin(item);
        addPin(mapPin);
      });

      return pinFragment;
    }
  };
>>>>>>> 9dc7e1b1840e64a1aef13cc716b109e888987194
})();
