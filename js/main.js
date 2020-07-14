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


    var onLoadDataSuccess = function (data) {
      var offerData = window.map.getData(data);

      var onMapPinsFieldClick = function (evt) {
        window.map.getCard(evt, offerData);
      };

      var onMapPinsFieldEnterPress = function (evt) {
        if (evt.key === window.constants.CONFIRM_EVT_KEY) {
          window.map.getCard(evt, offerData);
        }
      };

      mapPinsField.appendChild(window.pin.create(offerData));

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

    window.loadData.load(onLoadDataSuccess, onLoadDataError);

    window.form.setCapacityValidity();

    adFormAddressField.setAttribute('value', window.form.setAddress());

    var onAdFormRoomsFieldChange = function () {
      window.form.setCapacityValidity();
    };

    var onAdFormCapacityFieldChange = function () {
      window.form.setCapacityValidity();
    };

    var onAdFormTypeFieldChange = function () {
      window.form.setPriceFieldAttributes();
    };

    var onAdFormCheckInFieldChange = function (evt) {
      window.form.equalizeTimeFields(evt, adFormCheckOutField);
    };

    var onAdFormCheckOutFieldChange = function (evt) {
      window.form.equalizeTimeFields(evt, adFormCheckInField);
    };

    var onAdFormAvatarFieldChange = function (evt) {
      window.form.setFileTypeValidity(evt.target);
    };

    var onAdFormPhotoFieldChange = function (evt) {
      window.form.setFileTypeValidity(evt.target);
    };

    adFormRoomsField.addEventListener('change', onAdFormRoomsFieldChange);
    adFormCapacityField.addEventListener('change', onAdFormCapacityFieldChange);
    adFormTypeField.addEventListener('change', onAdFormTypeFieldChange);
    adFormCheckInField.addEventListener('change', onAdFormCheckInFieldChange);
    adFormCheckOutField.addEventListener('change', onAdFormCheckOutFieldChange);
    adFormAvatarField.addEventListener('change', onAdFormAvatarFieldChange);
    adFormPhotoField.addEventListener('change', onAdFormPhotoFieldChange);
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
