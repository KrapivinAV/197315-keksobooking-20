'use strict';

window.form = (function () {

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormRoomsField = adForm.querySelector('#room_number');
  var adFormCapacityField = adForm.querySelector('#capacity');
  var adFormPriceField = adForm.querySelector('#price');
  var mapPinMainWidth = mapPinMain.offsetWidth;
  var mapPinMainHeight = mapPinMain.offsetHeight;

  return {
    setAddress: function () {
      var x = mapPinMain.offsetLeft + Math.floor(mapPinMainWidth / 2);
      var y = map.classList.contains('map--faded') ?
        mapPinMain.offsetTop + Math.floor(mapPinMainHeight / 2) :
        mapPinMain.offsetTop + mapPinMainHeight + window.constants.MAP_PIN_MAIN_ARROW_HEIGHT;
      return x + ', ' + y;
    },

    setCapacityValidity: function () {
      var rooms = parseInt(adFormRoomsField.value, 10);
      var capacity = parseInt(adFormCapacityField.value, 10);
      if (rooms === 100 && capacity !== 0) {
        adFormCapacityField.setCustomValidity('Некорректное значение. Возможные варианты: "Не для гостей"');
      } else if ((rooms !== 100 && capacity === 0) || (rooms !== 100 && capacity > rooms)) {
        adFormCapacityField.setCustomValidity('Некорректное значение. Возможные варианты: "Не более ' + rooms + ' гостя(-ей)"');
      } else {
        adFormCapacityField.setCustomValidity('');
      }
    },

    setPriceFieldAttributes: function (evt) {
      adFormPriceField.setAttribute('placeholder', window.constants.TYPES_MIN_PRICES[evt.target.value]);
      adFormPriceField.setAttribute('min', window.constants.TYPES_MIN_PRICES[evt.target.value]);
    },

    equalizeTimeFields: function (evt, field) {
      field.value = evt.target.value;
    },

    setFileTypeValidity: function (fileInput) {
      if (fileInput.files[0].type.slice(window.constants.SUB_STRING_BEGIN, window.constants.SUB_STRING_LENGTH) !== 'image') {
        fileInput.setCustomValidity('Некорректный тип файла. Выберите файл-изображение');
      } else {
        fileInput.setCustomValidity('');
      }
    }
  };
})();
