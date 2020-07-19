'use strict';

window.main = (function () {

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');

  var onPinMainPrimaryButtonDown = function (evt) {
    window.action.isPrimaryButtonDownEvent(evt, setActiveMod);
  };

  var onPinMainEnterPress = function (evt) {
    window.action.isEnterEvent(evt, setActiveMod);
  };

  var setActiveMod = function () {
    mapPinMain.removeEventListener('mousedown', onPinMainPrimaryButtonDown);
    mapPinMain.removeEventListener('keydown', onPinMainEnterPress);

    window.map.activate();
    window.form.activate();
  };

  var setInactiveMod = function () {
    window.map.deactivate();
    window.form.deactivate();
    window.filter.deactivate();

    mapPinMain.addEventListener('mousedown', onPinMainPrimaryButtonDown);
    mapPinMain.addEventListener('keydown', onPinMainEnterPress);
  };

  setInactiveMod();
})();
