'use strict';

window.form = (function () {

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapPinMainWidth = mapPinMain.offsetWidth;
  var mapPinMainHeight = mapPinMain.offsetHeight;
  var adForm = document.querySelector('.ad-form');
  var adFormFields = Array.from(adForm.children);
  var adFormAddressField = adForm.querySelector('#address');
  var adFormRoomsField = adForm.querySelector('#room_number');
  var adFormCapacityField = adForm.querySelector('#capacity');
  var adFormPriceField = adForm.querySelector('#price');
  var adFormTypeField = adForm.querySelector('#type');
  var adFormCheckInField = adForm.querySelector('#timein');
  var adFormCheckOutField = adForm.querySelector('#timeout');
  var adFormAvatarField = adForm.querySelector('#avatar');
  var adFormPhotoField = adForm.querySelector('#images');

  var onAdFormRoomsFieldChange = function () {
    setCapacityValidity();
  };

  var onAdFormCapacityFieldChange = function () {
    setCapacityValidity();
  };

  var onAdFormTypeFieldChange = function () {
    setPriceFieldAttributes();
  };

  var onAdFormCheckInFieldChange = function (evt) {
    equalizeTimeFields(evt, adFormCheckOutField);
  };

  var onAdFormCheckOutFieldChange = function (evt) {
    equalizeTimeFields(evt, adFormCheckInField);
  };

  var onAdFormAvatarFieldChange = function (evt) {
    setFileTypeValidity(evt.target);
  };

  var onAdFormPhotoFieldChange = function (evt) {
    setFileTypeValidity(evt.target);
  };

  var setCapacityValidity = function () {
    var rooms = parseInt(adFormRoomsField.value, 10);
    var capacity = parseInt(adFormCapacityField.value, 10);
    if (rooms === 100 && capacity !== 0) {
      adFormCapacityField.setCustomValidity('Некорректное значение. Возможные варианты: "Не для гостей"');
    } else if ((rooms !== 100 && capacity === 0) || (rooms !== 100 && capacity > rooms)) {
      adFormCapacityField.setCustomValidity('Некорректное значение. Возможные варианты: "Не более ' + rooms + ' гостя(-ей)"');
    } else {
      adFormCapacityField.setCustomValidity('');
    }
  };

  var setPriceFieldAttributes = function (evt) {
    adFormPriceField.setAttribute('placeholder', window.constants.TYPES_MIN_PRICES[evt.target.value]);
    adFormPriceField.setAttribute('min', window.constants.TYPES_MIN_PRICES[evt.target.value]);
  };

  var equalizeTimeFields = function (evt, field) {
    field.value = evt.target.value;
  };

  var setFileTypeValidity = function (fileInput) {
    if (fileInput.files[0].type.slice(window.constants.SUB_STRING_BEGIN, window.constants.SUB_STRING_LENGTH) !== 'image') {
      fileInput.setCustomValidity('Некорректный тип файла. Выберите файл-изображение');
    } else {
      fileInput.setCustomValidity('');
    }
  };

  return {
    setAddress: function () {
      var x = mapPinMain.offsetLeft + Math.floor(mapPinMainWidth / 2);
      var y = map.classList.contains('map--faded') ?
        mapPinMain.offsetTop + Math.floor(mapPinMainHeight / 2) :
        mapPinMain.offsetTop + mapPinMainHeight + window.constants.MAP_PIN_MAIN_ARROW_HEIGHT;
      adFormAddressField.setAttribute('value', x + ', ' + y);
    },

    activate: function () {
      adForm.classList.remove('ad-form--disabled');
      adFormFields.forEach(function (item) {
        item.removeAttribute('disabled');
      });

      setCapacityValidity();
      window.form.setAddress();

      adFormRoomsField.addEventListener('change', onAdFormRoomsFieldChange);
      adFormCapacityField.addEventListener('change', onAdFormCapacityFieldChange);
      adFormTypeField.addEventListener('change', onAdFormTypeFieldChange);
      adFormCheckInField.addEventListener('change', onAdFormCheckInFieldChange);
      adFormCheckOutField.addEventListener('change', onAdFormCheckOutFieldChange);
      adFormAvatarField.addEventListener('change', onAdFormAvatarFieldChange);
      adFormPhotoField.addEventListener('change', onAdFormPhotoFieldChange);
    },

    deactivate: function () {
      adForm.classList.add('ad-form--disabled');
      adFormFields.forEach(function (item) {
        item.setAttribute('disabled', 'disabled');
      });

      window.form.setAddress();

      adFormRoomsField.removeEventListener('change', onAdFormRoomsFieldChange);
      adFormCapacityField.removeEventListener('change', onAdFormCapacityFieldChange);
      adFormTypeField.removeEventListener('change', onAdFormTypeFieldChange);
      adFormCheckInField.removeEventListener('change', onAdFormCheckInFieldChange);
      adFormCheckOutField.removeEventListener('change', onAdFormCheckOutFieldChange);
      adFormAvatarField.removeEventListener('change', onAdFormAvatarFieldChange);
      adFormPhotoField.removeEventListener('change', onAdFormPhotoFieldChange);

    }
  };
})();
