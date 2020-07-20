'use strict';

window.move = (function () {

  var mapPinsField = document.querySelector('.map__pins');
  var mapPinsFieldWidth = mapPinsField.clientWidth;
  var mapPinMain = mapPinsField.querySelector('.map__pin--main');
  var mapPinMainWidth = mapPinMain.offsetWidth;
  var mapPinMainHeight = mapPinMain.offsetHeight;

  var getCurrentCoordinate = function (value, min, max) {
    if (value < min) {
      return min;
    } else if (value > max) {
      return max;
    } else {
      return value;
    }
  };

  var onMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.top = getCurrentCoordinate(mapPinMain.offsetTop - shift.y, window.constants.MapPinMainParameters.COORDINATE_Y_MIN - mapPinMainHeight - window.constants.MapPinMainParameters.ARROW_HEIGHT, window.constants.MapPinMainParameters.COORDINATE_Y_MAX - mapPinMainHeight - window.constants.MapPinMainParameters.ARROW_HEIGHT) + 'px';
      mapPinMain.style.left = getCurrentCoordinate(mapPinMain.offsetLeft - shift.x, -mapPinMainWidth / 2, mapPinsFieldWidth - (mapPinMainWidth / 2)) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mapPinMain.removeEventListener('click', onClickPreventDefault);
        };
        mapPinMain.addEventListener('click', onClickPreventDefault);
      }

      window.form.setAddress();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  mapPinMain.addEventListener('mousedown', onMouseDown);
})();
