'use strict';

window.map = (function () {

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapPinsField = map.querySelector('.map__pins');
  var mapFilter = map.querySelector('.map__filters-container');

  var onPinMainPrimaryButtonDown = function (evt) {
    window.action.isPrimaryButtonDownEvent(evt, window.main.setActiveMode);
  };

  var onPinMainEnterPress = function (evt) {
    window.action.isEnterEvent(evt, window.main.setActiveMode);
  };

  var getElementNumber = function (evt) {
    var element = evt.target.tagName.toLowerCase();
    var mapPinsCollection = Array.from(mapPinsField.children);
    if (element === 'button') {
      return mapPinsCollection.indexOf(evt.target, window.constants.PinParameter.FIRST_AVAILABLE_INDEX);
    } else if (element === 'img' || element === 'svg') {
      return mapPinsCollection.indexOf(evt.target.closest('button'), window.constants.PinParameter.FIRST_AVAILABLE_INDEX);
    } else {
      return null;
    }
  };

  var onPopupEscPress = function (evt) {
    window.action.isEscEvent(evt, closePopup);
  };

  var onCardCloseClick = function () {
    closePopup();
  };

  var onCardCloseEnterPress = function (evt) {
    window.action.isEnterEvent(evt, closePopup);
  };

  var openPopup = function (evt, index, data) {
    map.insertBefore(window.card.create(data[index - window.constants.PinParameter.FIRST_AVAILABLE_INDEX]), mapFilter);
    mapPinsField.children[index].classList.add('map__pin--active');
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

    map.querySelector('.map__pin--active').classList.remove('map__pin--active');
    map.querySelector('.popup').remove();
  };

  var offerData = [];
  var currentOfferSet = [];

  var onMapPinsFieldClick = function (evt) {
    window.map.getCard(evt, currentOfferSet);
  };

  var onMapPinsFieldEnterPress = function (evt) {
    window.action.isEnterEvent(evt, window.map.getCard.bind(null, evt, currentOfferSet));
  };

  var removeAllOfferPins = function () {
    var mapCurrentPinSet = mapPinsField.querySelectorAll('.map__pin');

    for (var i = mapCurrentPinSet.length - 1; i > window.constants.MapPinMainParameter.COLLECTION_POSITION; i--) {
      mapPinsField.removeChild(mapCurrentPinSet[i]);
    }
  };

  var onMapFilterFormChange = function () {
    if (map.querySelector('.popup')) {
      closePopup();
    }

    removeAllOfferPins();

    currentOfferSet = window.filter.getCurrentOfferSet(offerData);
    mapPinsField.appendChild(window.pin.create(currentOfferSet));
  };

  var onLoadDataSuccess = function (data) {
    offerData = window.map.getData(data);
    currentOfferSet = window.filter.getCurrentOfferSet(offerData);

    mapPinsField.appendChild(window.pin.create(currentOfferSet));
    window.filter.activate();

    mapPinsField.addEventListener('click', onMapPinsFieldClick);
    mapPinsField.addEventListener('keydown', onMapPinsFieldEnterPress);
  };

  var onLoadDataError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  return {
    setFilterParameters: function () {
      onMapFilterFormChange();
    },

    getCard: function (evt, data) {
      if (map.querySelector('.popup')) {
        map.querySelector('.popup').remove();
        map.querySelector('.map__pin--active').classList.remove('map__pin--active');
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

      mapPinMain.removeEventListener('mousedown', onPinMainPrimaryButtonDown);
      mapPinMain.removeEventListener('keydown', onPinMainEnterPress);

      window.data.load(onLoadDataSuccess, onLoadDataError);
    },

    deactivate: function () {
      if (!map.classList.contains('map--faded')) {
        mapPinsField.removeEventListener('click', onMapPinsFieldClick);
        mapPinsField.removeEventListener('keydown', onMapPinsFieldEnterPress);

        if (map.querySelector('.popup')) {
          closePopup();
        }

        removeAllOfferPins();
      }

      mapPinMain.style.top = window.constants.MapPinMainParameter.BASIS_TOP + 'px';
      mapPinMain.style.left = window.constants.MapPinMainParameter.BASIS_LEFT + 'px';

      mapPinMain.addEventListener('mousedown', onPinMainPrimaryButtonDown);
      mapPinMain.addEventListener('keydown', onPinMainEnterPress);

      map.classList.add('map--faded');
    }
  };
})();
