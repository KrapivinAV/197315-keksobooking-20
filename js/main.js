'use strict';

window.main = (function () {

  var map = document.querySelector('.map');
  var mapPinsField = map.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapFilterForm = map.querySelector('.map__filters');

  var onPinMainPrimaryButtonDown = function (evt) {
    window.action.isPrimaryButtonDownEvent(evt, setActiveMod);
  };

  var onPinMainEnterPress = function (evt) {
    window.action.isEnterEvent(evt, setActiveMod);
  };

  var offerData = [];
  var currentOfferSet = [];

  var onMapPinsFieldClick = function (evt) {
    window.map.getCard(evt, currentOfferSet);
  };

  var onMapPinsFieldEnterPress = function (evt) {
    if (evt.key === window.constants.CONFIRM_EVT_KEY) {
      window.map.getCard(evt, currentOfferSet);
    }
  };

  var onMapFilterFormChange = function () {
    var mapCurrentPinSet = mapPinsField.querySelectorAll('.map__pin');
    if (map.querySelector('.popup')) {
      window.map.closeCard();
    }

    for (var i = mapCurrentPinSet.length - 1; i > window.constants.MAIN_PIN_POSITION; i--) {
      mapPinsField.removeChild(mapCurrentPinSet[i]);
    }

    currentOfferSet = window.filter.getCurrentOfferSet(offerData);
    mapPinsField.appendChild(window.pin.create(currentOfferSet));
  };

  var setActiveMod = function () {
    mapPinMain.removeEventListener('mousedown', onPinMainPrimaryButtonDown);
    mapPinMain.removeEventListener('keydown', onPinMainEnterPress);

    window.map.activate();
    window.form.activate();

    var onLoadDataSuccess = function (data) {
      offerData = window.map.getData(data);
      currentOfferSet = window.filter.getCurrentOfferSet(offerData);

      mapPinsField.appendChild(window.pin.create(currentOfferSet));
      window.filter.activate();

      mapFilterForm.addEventListener('change', onMapFilterFormChange);
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

    window.data.load(onLoadDataSuccess, onLoadDataError);
  };

  var setInactiveMod = function () {
    if (!map.classList.contains('map--faded')) {
      mapFilterForm.removeEventListener('change', onMapFilterFormChange);
      mapPinsField.removeEventListener('click', onMapPinsFieldClick);
      mapPinsField.removeEventListener('keydown', onMapPinsFieldEnterPress);
    }

    window.map.deactivate();
    window.form.deactivate();
    window.filter.deactivate();

    mapPinMain.addEventListener('mousedown', onPinMainPrimaryButtonDown);
    mapPinMain.addEventListener('keydown', onPinMainEnterPress);
  };

  setInactiveMod();
})();
