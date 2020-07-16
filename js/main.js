'use strict';

window.main = (function () {

  var map = document.querySelector('.map');
  var mapPinsField = map.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');

  var onPinMainPrimaryButtonDown = function (evt) {
    window.action.isPrimaryButtonDownEvent(evt, setActiveMod);
  };

  var onPinMainEnterPress = function (evt) {
    window.action.isEnterEvent(evt, setActiveMod);
  };

  var offerData = [];

  var onMapPinsFieldClick = function (evt) {
    window.map.getCard(evt, offerData);
  };

  var onMapPinsFieldEnterPress = function (evt) {
    if (evt.key === window.constants.CONFIRM_EVT_KEY) {
      window.map.getCard(evt, offerData);
    }
  };

  var setActiveMod = function () {
    mapPinMain.removeEventListener('mousedown', onPinMainPrimaryButtonDown);
    mapPinMain.removeEventListener('keydown', onPinMainEnterPress);

    window.map.activate();
    window.form.activate();

    var onLoadDataSuccess = function (data) {
      offerData = window.map.getData(data);

      mapPinsField.appendChild(window.pin.create(offerData));
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

    window.data.load(onLoadDataSuccess, onLoadDataError);
  };

  var setInactiveMod = function () {
    if (!map.classList.contains('map--faded')) {
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

// повторный пр для 6-2
