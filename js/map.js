'use strict';

window.map = (function () {

  var map = document.querySelector('.map');
  var mapPinsField = map.querySelector('.map__pins');
  var mapFilter = map.querySelector('.map__filters-container');
  var database = window.data();

  var getElementNumber = function (evt) {
    var element = evt.target.tagName.toLowerCase();
    var mapPinsCollection = Array.from(mapPinsField.children);
    if (element === 'button') {
      return mapPinsCollection.indexOf(evt.target, 2);
    } else if (element === 'img' || element === 'svg') {
      return mapPinsCollection.indexOf(evt.target.closest('button'), 2);
    } else {
      return null;
    }
  };

  var onPopupEscPress = function (evt) {
    if (evt.key === window.constants.CANCEL_EVT_KEY) {
      evt.preventDefault();
      closePopup();
    }
  };

  var openPopup = function (index) {
    var offerData = window.map.getData();
    map.insertBefore(window.card.create(offerData[index - 2]), mapFilter);
    document.addEventListener('keydown', onPopupEscPress);

    var cardClose = document.querySelector('.popup__close');

    cardClose.addEventListener('click', function () {
      closePopup();
    });

    cardClose.addEventListener('keydown', function (evt) {
      if (evt.key === window.constants.CONFIRM_EVT_KEY) {
        closePopup();
      }
    });
  };

  var closePopup = function () {
    document.removeEventListener('keydown', onPopupEscPress);

    var cardClose = document.querySelector('.popup__close');

    cardClose.removeEventListener('click', function () {
      closePopup();
    });

    cardClose.removeEventListener('keydown', function (evt) {
      if (evt.key === window.constants.CONFIRM_EVT_KEY) {
        closePopup();
      }
    });

    map.querySelector('.popup').remove();
  };

  return {
    getCard: function (evt) {
      if (map.querySelector('.popup')) {
        map.querySelector('.popup').remove();
      }
      var elementNumber = getElementNumber(evt);
      if (elementNumber > 1) {
        openPopup(elementNumber);
      }
    },

    getData: function () {
      var validityData = [];

      database.forEach(function (item) {
        if (item.offer) {
          validityData.push(item);
        }
      });

      /*
      Здесь будет выборка по параметрам фильтра
      */

      var currentData = validityData.slice(window.constants.FIRST_OFFER, window.constants.LAST_OFFER);
      return currentData;
    }
  };
})();
