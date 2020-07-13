'use strict';

window.main = (function () {

  var map = document.querySelector('.map');
  var mapPinsField = map.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapFilter = map.querySelector('.map__filters-container');
  var mapFilterFields = Array.from(mapFilter.children);
  var adForm = document.querySelector('.ad-form');
  var adFormFields = Array.from(adForm.children);
  var adFormAddressField = adForm.querySelector('#address');
  var adFormRoomsField = adForm.querySelector('#room_number');
  var adFormCapacityField = adForm.querySelector('#capacity');
  var adFormTypeField = adForm.querySelector('#type');
  var adFormCheckInField = adForm.querySelector('#timein');
  var adFormCheckOutField = adForm.querySelector('#timeout');
  var adFormAvatarField = adForm.querySelector('#avatar');
  var adFormPhotoField = adForm.querySelector('#images');

  var setActiveMod = function () {
    mapPinMain.removeEventListener('mousedown', onPinMainPrimaryButtonDown);

    mapPinMain.removeEventListener('keydown', onPinMainEnterPress);

    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    mapFilterFields.forEach(function (item) {
      item.removeAttribute('disabled');
    });

    adFormFields.forEach(function (item) {
      item.removeAttribute('disabled');
    });

    mapPinsField.appendChild(window.pin.create(offerData));

    window.form.setCapacityValidity();

    adFormAddressField.setAttribute('value', window.form.setAddress());

    adFormRoomsField.addEventListener('change', window.form.setCapacityValidity);

    adFormCapacityField.addEventListener('change', window.form.setCapacityValidity);

    adFormTypeField.addEventListener('change', window.form.setPriceFieldAttributes);

    adFormCheckInField.addEventListener('change', function (evt) {
      window.form.equalizeTimeFields(evt, adFormCheckOutField);
    });

    adFormCheckOutField.addEventListener('change', function (evt) {
      window.form.equalizeTimeFields(evt, adFormCheckInField);
    });

    adFormAvatarField.addEventListener('change', function (evt) {
      window.form.setFileTypeValidity(evt.target);
    });

    adFormPhotoField.addEventListener('change', function (evt) {
      window.form.setFileTypeValidity(evt.target);
    });

    mapPinsField.addEventListener('click', window.map.getCard);

    mapPinsField.addEventListener('keydown', function (evt) {
      if (evt.key === window.constants.CONFIRM_EVT_KEY) {
        window.map.getCard();
      }
    });
  };

  var setInactiveMod = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    mapFilterFields.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });

    adFormFields.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });

    adFormAddressField.setAttribute('value', window.form.setAddress());
  };

  var offerData = window.map.getData();

  var onPinMainPrimaryButtonDown = function (evt) {
    window.action.isPrimaryButtonDownEvent(evt, setActiveMod);
  };

  var onPinMainEnterPress = function (evt) {
    window.action.isEnterEvent(evt, setActiveMod);
  };

  setInactiveMod();

  mapPinMain.addEventListener('mousedown', onPinMainPrimaryButtonDown);

  mapPinMain.addEventListener('keydown', onPinMainEnterPress);
})();
