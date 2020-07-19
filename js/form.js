'use strict';

window.form = (function () {

  var main = document.querySelector('main');
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
  var adFormResetButton = adForm.querySelector('.ad-form__reset');
  var successTemplate = document.querySelector('#success').content;
  var successPopup = successTemplate.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content;
  var errorPopup = errorTemplate.querySelector('.error');

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

  var setCurrentAddress = function () {
    var x = mapPinMain.offsetLeft + Math.floor(mapPinMainWidth / 2);
    var y = map.classList.contains('map--faded') ?
      mapPinMain.offsetTop + Math.floor(mapPinMainHeight / 2) :
      mapPinMain.offsetTop + mapPinMainHeight + window.constants.MAP_PIN_MAIN_ARROW_HEIGHT;
    adFormAddressField.setAttribute('value', x + ', ' + y);
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

  var closeSuccessMessage = function (element) {
    document.removeEventListener('click', onSuccessMassageOutClick);
    document.removeEventListener('keydown', onSuccessMassageEscPress);
    main.removeChild(element);
  };

  var onSuccessMassageOutClick = function (evt) {
    var successMessage = main.querySelector('.success');
    if (evt.target === successMessage) {
      closeSuccessMessage(successMessage);
    }
  };

  var onSuccessMassageEscPress = function (evt) {
    var successMessage = main.querySelector('.success');
    if (evt.key === window.constants.CANCEL_EVT_KEY) {
      evt.preventDefault();
      closeSuccessMessage(successMessage);
    }
  };

  var onUploadDataSuccess = function () {
    var successMessage = successPopup.cloneNode(true);
    main.appendChild(successMessage);
    window.main.setInactiveMode();

    document.addEventListener('click', onSuccessMassageOutClick);
    document.addEventListener('keydown', onSuccessMassageEscPress);
  };

  var onUploadDataError = function () {
    var errorMessage = errorPopup.cloneNode(true);
    main.appendChild(errorMessage);
  };

  var onAdFormSubmit = function (evt) {
    window.data.upload(new FormData(adForm), onUploadDataSuccess, onUploadDataError);
    evt.preventDefault();
  };

  var onAdFormResetButtonClick = function (evt) {
    evt.preventDefault();
    window.main.setInactiveMode();
  };

  var onAdFormResetButtonEnterPress = function (evt) {
    if (evt.key === window.constants.CONFIRM_EVT_KEY) {
      evt.preventDefault();
      window.main.setInactiveMode();
    }
  };

  var activateForm = function () {
    adForm.classList.remove('ad-form--disabled');
    adFormFields.forEach(function (item) {
      item.removeAttribute('disabled');
    });

    setCapacityValidity();
    setCurrentAddress();

    adFormRoomsField.addEventListener('change', onAdFormRoomsFieldChange);
    adFormCapacityField.addEventListener('change', onAdFormCapacityFieldChange);
    adFormTypeField.addEventListener('change', onAdFormTypeFieldChange);
    adFormCheckInField.addEventListener('change', onAdFormCheckInFieldChange);
    adFormCheckOutField.addEventListener('change', onAdFormCheckOutFieldChange);
    adFormAvatarField.addEventListener('change', onAdFormAvatarFieldChange);
    adFormPhotoField.addEventListener('change', onAdFormPhotoFieldChange);
    adForm.addEventListener('submit', onAdFormSubmit);
    adFormResetButton.addEventListener('click', onAdFormResetButtonClick);
    adFormResetButton.addEventListener('keydown', onAdFormResetButtonEnterPress);
  };

  var deactivateForm = function () {
    adForm.reset();
    adForm.classList.add('ad-form--disabled');
    adFormFields.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });

    setCurrentAddress();

    adFormRoomsField.removeEventListener('change', onAdFormRoomsFieldChange);
    adFormCapacityField.removeEventListener('change', onAdFormCapacityFieldChange);
    adFormTypeField.removeEventListener('change', onAdFormTypeFieldChange);
    adFormCheckInField.removeEventListener('change', onAdFormCheckInFieldChange);
    adFormCheckOutField.removeEventListener('change', onAdFormCheckOutFieldChange);
    adFormAvatarField.removeEventListener('change', onAdFormAvatarFieldChange);
    adFormPhotoField.removeEventListener('change', onAdFormPhotoFieldChange);
    adForm.removeEventListener('submit', onAdFormSubmit);
    adFormResetButton.removeEventListener('click', onAdFormResetButtonClick);
    adFormResetButton.removeEventListener('keydown', onAdFormResetButtonEnterPress);
  };

  return {
    setAddress: function () {
      setCurrentAddress();
    },

    activate: function () {
      activateForm();
    },

    deactivate: function () {
      deactivateForm();
    }
  };
})();
