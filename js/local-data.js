'use strict';

window.data = (function () {

  var map = document.querySelector('.map');
  var mapPinsField = map.querySelector('.map__pins');
  var mapPinsFieldWidth = mapPinsField.clientWidth;

  var getRandomIntegerValue = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getGuestsQuantity = function (roomsQuantity) {
    return roomsQuantity !== window.constants.ROOMS_VARIANTS[window.constants.ROOMS_VARIANTS.length - 1] ?
      getRandomIntegerValue(1, roomsQuantity) :
      'Не для гостей';
  };

  var getSet = function (basisMassive) {
    var resultSet = [];
    for (var i = 0; i < getRandomIntegerValue(1, basisMassive.length); i++) {
      var setChallenger = basisMassive[getRandomIntegerValue(0, basisMassive.length - 1)];
      if (i !== 0) {
        var trigger = 0;
        for (var j = 0; j < i; j++) {
          if (setChallenger === resultSet[j]) {
            trigger++;
          }
        }
        if (trigger === 0) {
          resultSet[i] = setChallenger;
        } else {
          i--;
        }
      } else {
        resultSet[i] = setChallenger;
      }
    }
    return resultSet;
  };

  return function () {
    var massiveDatabase = [];
    for (var i = 0; i < window.constants.QUANTITY_OF_OFFERS; i++) {
      var roomsSet = window.constants.ROOMS_VARIANTS[getRandomIntegerValue(0, window.constants.ROOMS_VARIANTS.length - 1)];
      var xTemp = getRandomIntegerValue(window.constants.PIN_COORDINATE_X_MIN, mapPinsFieldWidth);
      var yTemp = getRandomIntegerValue(window.constants.PIN_COORDINATE_Y_MIN, window.constants.PIN_COORDINATE_Y_MAX);
      var ad = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        location: {
          x: xTemp,
          y: yTemp
        },
        offer: {
          title: 'Заголовок предложения от Товарища №' + (i + 1),
          address: '(' + xTemp + ',' + yTemp + ')',
          price: getRandomIntegerValue(window.constants.PRICE_MIN, window.constants.PRICE_MAX),
          type: window.constants.TYPES[getRandomIntegerValue(0, window.constants.TYPES.length - 1)],
          rooms: roomsSet,
          guests: getGuestsQuantity(roomsSet),
          checkin: getRandomIntegerValue(window.constants.CHECK_IN_OUT_TIME_MIN, window.constants.CHECK_IN_OUT_TIME_MAX) + ':00',
          checkout: getRandomIntegerValue(window.constants.CHECK_IN_OUT_TIME_MIN, window.constants.CHECK_IN_OUT_TIME_MAX) + ':00',
          features: getSet(window.constants.FEATURES),
          description: 'Описание предложения от Товарища №' + (i + 1),
          photos: getSet(window.constants.PHOTOS)
        }
      };
      massiveDatabase.push(ad);
    }
    return massiveDatabase;
  };
})();
