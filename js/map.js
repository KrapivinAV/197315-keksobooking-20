'use strict';

window.map = (function () {

  var map = document.querySelector('.map');
  var mapPinsField = map.querySelector('.map__pins');
  var mapFilter = map.querySelector('.map__filters-container');

  var getElementNumber = function (evt) {
    var element = evt.target.tagName.toLowerCase();
    var mapPinsCollection = Array.from(mapPinsField.children);
    if (element === 'button') {
      return mapPinsCollection.indexOf(evt.target, window.constants.PIN_FIRST_AVAILABLE_INDEX);
    } else if (element === 'img' || element === 'svg') {
      return mapPinsCollection.indexOf(evt.target.closest('button'), window.constants.PIN_FIRST_AVAILABLE_INDEX);
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

  var onCardCloseClick = function () {
    closePopup();
  };

  var onCardCloseEnterPress = function (evt) {
    if (evt.key === window.constants.CONFIRM_EVT_KEY) {
      closePopup();
    }
  };

  var openPopup = function (evt, index, data) {
    map.insertBefore(window.card.create(data[index - window.constants.PIN_FIRST_AVAILABLE_INDEX]), mapFilter);
    var cardClose = document.querySelector('.popup__close');

    document.addEventListener('keydown', onPopupEscPress);
    cardClose.addEventListener('click', onCardCloseClick);
    cardClose.addEventListener('keydown', onCardCloseEnterPress);
  };

  var closePopup = function () {
    var cardClose = document.querySelector('.popup__close');

    document.removeEventListener('keydown', onPopupEscPress);
    cardClose.removeEventListener('click', onCardCloseClick);
    cardClose.removeEventListener('keydown', onCardCloseEnterPress);

    map.querySelector('.popup').remove();
  };

  return {
    closeCard: function () {
      onCardCloseClick();
    },

    getCard: function (evt, data) {
      if (map.querySelector('.popup')) {
        map.querySelector('.popup').remove();
      }
      var elementNumber = getElementNumber(evt);
      if (elementNumber > 1) {
        openPopup(evt, elementNumber, data);
      }
    },

    getData: function (data) {
      var validityData = [];

      data.forEach(function (item) {
        if (item.offer && item.offer !== {}) {
          validityData.push(item);
        }
      });

      return validityData;
    },

    activate: function () {
      map.classList.remove('map--faded');
    },

    deactivate: function () {
      map.classList.add('map--faded');
    }
  };
})();
