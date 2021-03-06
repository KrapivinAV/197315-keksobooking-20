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
  var adFormAvatarImage = adForm.querySelector('.ad-form-header__preview img');
  var adFormPhotoField = adForm.querySelector('#images');
  var previewContainer = adForm.querySelector('.ad-form__photo');
  var adFormResetButton = adForm.querySelector('.ad-form__reset');
  var successTemplate = document.querySelector('#success').content;
  var successPopup = successTemplate.querySelector('.success');
  var successMessage;
  var errorTemplate = document.querySelector('#error').content;
  var errorPopup = errorTemplate.querySelector('.error');
  var errorMessage;
  var errorButton;

  var onAdFormRoomsFieldChange = function () {
    setCapacityValidity();
  };

  var onAdFormCapacityFieldChange = function () {
    setCapacityValidity();
  };

  var onAdFormTypeFieldChange = function (evt) {
    setPriceFieldAttributes(evt.target.value);
  };

  var onAdFormCheckInFieldChange = function (evt) {
    equalizeTimeFields(evt, adFormCheckOutField);
  };

  var onAdFormCheckOutFieldChange = function (evt) {
    equalizeTimeFields(evt, adFormCheckInField);
  };

  var onAdFormAvatarFieldChange = function (evt) {
    setFileTypeValidity(evt.target, adFormAvatarImage);
  };

  var onAdFormPhotoFieldChange = function (evt) {
    removeFormPhoto();
    var photo = document.createElement('img');
    photo.setAttribute('alt', 'Фото предлагаемого жилого помещения');
    photo.setAttribute('width', window.constants.PREVIEW_CONTEINER_WIDTH);
    photo.setAttribute('height', window.constants.PREVIEW_CONTEINER_HEIGHT);
    previewContainer.appendChild(photo);
    var preview = previewContainer.firstChild;
    setFileTypeValidity(evt.target, preview);
  };

  var removeFormPhoto = function () {
    if (previewContainer.firstChild) {
      previewContainer.firstChild.remove();
    }
  };

  var setCurrentAddress = function () {
    var x = mapPinMain.offsetLeft + Math.floor(mapPinMainWidth / 2);
    var y = map.classList.contains('map--faded') ?
      mapPinMain.offsetTop + Math.floor(mapPinMainHeight / 2) :
      mapPinMain.offsetTop + mapPinMainHeight + window.constants.MapPinMainParameter.ARROW_HEIGHT;
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

  var setPriceFieldAttributes = function (fieldValue) {
    adFormPriceField.setAttribute('placeholder', window.constants.TypesMinPrice[fieldValue.toUpperCase()]);
    adFormPriceField.setAttribute('min', window.constants.TypesMinPrice[fieldValue.toUpperCase()]);
  };

  var equalizeTimeFields = function (evt, field) {
    field.value = evt.target.value;
  };

  var setFileTypeValidity = function (fileInput, preview) {
    var file = fileInput.files[0];
    if (file.type.slice(window.constants.MIMESubStringParameter.BEGIN, window.constants.MIMESubStringParameter.LENGTH) !== 'image') {
      fileInput.setCustomValidity('Некорректный тип файла. Выберите файл-изображение');
    } else {
      fileInput.setCustomValidity('');
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var closeSuccessMessage = function (element) {
    document.removeEventListener('click', onSuccessMessageOutClick);
    document.removeEventListener('keydown', onSuccessMessageEscPress);
    main.removeChild(element);
  };

  var onSuccessMessageOutClick = function (evt) {
    if (evt.target === successMessage) {
      closeSuccessMessage(successMessage);
    }
  };

  var onSuccessMessageEscPress = function (evt) {
    window.action.isEscEvent(evt, closeSuccessMessage.bind(null, successMessage));
  };

  var onUploadDataSuccess = function () {
    var successBlock = successPopup.cloneNode(true);
    main.appendChild(successBlock);
    successMessage = main.querySelector('.success');
    window.main.setInactiveMode();

    document.addEventListener('click', onSuccessMessageOutClick);
    document.addEventListener('keydown', onSuccessMessageEscPress);
  };

  var closeErrorMessage = function (element) {
    document.removeEventListener('click', onErrorMessageOutClick);
    document.removeEventListener('keydown', onErrorMessageEscPress);
    errorButton.removeEventListener('click', onErrorButtonClick);
    errorButton.removeEventListener('keydown', onErrorButtonEnterPress);
    main.removeChild(element);
  };

  var onErrorMessageOutClick = function (evt) {
    var errorMessageText = main.querySelector('.error__message');
    if (evt.target === errorMessage && evt.target !== errorMessageText) {
      closeErrorMessage(errorMessage);
    }
  };

  var onErrorMessageEscPress = function (evt) {
    window.action.isEscEvent(evt, closeErrorMessage.bind(null, errorMessage));
  };

  var onErrorButtonClick = function () {
    closeErrorMessage(errorMessage);
  };

  var onErrorButtonEnterPress = function (evt) {
    window.action.isEnterEvent(evt, closeErrorMessage.bind(null, errorMessage));
  };

  var onUploadDataError = function () {
    var errorBlock = errorPopup.cloneNode(true);
    main.appendChild(errorBlock);
    errorMessage = main.querySelector('.error');
    errorButton = document.querySelector('.error__button');

    document.addEventListener('click', onErrorMessageOutClick);
    document.addEventListener('keydown', onErrorMessageEscPress);
    errorButton.addEventListener('click', onErrorButtonClick);
    errorButton.addEventListener('keydown', onErrorButtonEnterPress);
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
    window.action.isEnterEvent(evt, window.main.setInactiveMode);
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
    setPriceFieldAttributes(adFormTypeField.value);

    if (adFormAvatarImage.src !== 'img/muffin-grey.svg') {
      adFormAvatarImage.src = 'img/muffin-grey.svg';
    }

    removeFormPhoto();

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
