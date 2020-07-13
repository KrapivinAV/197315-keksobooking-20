'use strict';

var map = document.querySelector('.map');
var mapPinsField = map.querySelector('.map__pins');
var mapPinMain = map.querySelector('.map__pin--main');
var mapFilter = map.querySelector('.map__filters-container');
var mapFilterFields = mapFilter.children;
var adForm = document.querySelector('.ad-form');
var adFormFields = adForm.children;
var adFormAddressField = adForm.querySelector('#address');
var adFormRoomsField = adForm.querySelector('#room_number');
var adFormCapacityField = adForm.querySelector('#capacity');
var adFormTypeField = adForm.querySelector('#type');
var adFormPriceField = adForm.querySelector('#price');
var adFormCheckInField = adForm.querySelector('#timein');
var adFormCheckOutField = adForm.querySelector('#timeout');
var adFormAvatarField = adForm.querySelector('#avatar');
var adFormPhotoField = adForm.querySelector('#images');
var mapPinMainWidth = mapPinMain.offsetWidth;
var mapPinMainHeight = mapPinMain.offsetHeight;


var setActiveMod = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  for (var i = 0; i < mapFilterFields.length; i++) {
    mapFilterFields[i].removeAttribute('disabled');
  }

  for (i = 0; i < adFormFields.length; i++) {
    adFormFields[i].removeAttribute('disabled');
  }

  mapPinsField.appendChild(window.pin.create(database));

  setCapacityValidity();

  adFormRoomsField.addEventListener('change', setCapacityValidity);

  adFormCapacityField.addEventListener('change', setCapacityValidity);

  adFormTypeField.addEventListener('change', setPriceFieldAttributes);

  adFormCheckInField.addEventListener('change', function (evt) {
    equalizeTimeFields(evt, adFormCheckOutField);
  });

  adFormCheckOutField.addEventListener('change', function (evt) {
    equalizeTimeFields(evt, adFormCheckInField);
  });

  adFormAvatarField.addEventListener('change', function (evt) {
    setFileTypeValidity(evt.target);
  });

  adFormPhotoField.addEventListener('change', function (evt) {
    setFileTypeValidity(evt.target);
  });

  mapPinsField.addEventListener('click', getCard);

  mapPinsField.addEventListener('keydown', function (evt) {
    if (evt.key === window.constants.CONFIRM_EVT_KEY) {
      getCard();
    }
  });

  adFormAddressField.setAttribute('value', setAddress());
};

var setInactiveMod = function () {
  map.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');

  for (var i = 0; i < mapFilterFields.length; i++) {
    mapFilterFields[i].setAttribute('disabled', 'disabled');
  }

  for (i = 0; i < adFormFields.length; i++) {
    adFormFields[i].setAttribute('disabled', 'disabled');
  }

  adFormAddressField.setAttribute('value', setAddress());
};

var setAddress = function () {
  return map.classList.contains('map--faded') ?
    (mapPinMain.offsetLeft + Math.floor(mapPinMainWidth / 2)) + ',' + (mapPinMain.offsetTop + Math.floor(mapPinMainHeight / 2)) :
    (mapPinMain.offsetLeft + Math.floor(mapPinMainWidth / 2)) + ',' + (mapPinMain.offsetTop + mapPinMainHeight + window.constants.MAP_PIN_MAIN_ARROW_HEIGHT);
};

var compareRoomsVersusCapacity = function () {
  return adFormRoomsField.value === '100' && adFormCapacityField.value === '0' ?
    true :
    adFormRoomsField.value >= adFormCapacityField.value && adFormRoomsField.value !== '100' && adFormCapacityField.value !== '0';
};

var setCapacityValidity = function () {
  if (!compareRoomsVersusCapacity()) {
    adFormCapacityField.setCustomValidity('Значение не соответствует количеству комнат');
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
  if (fileInput.files[0].type.slice(0, 5) !== 'image') {
    fileInput.setCustomValidity('Некорректный тип файла. Выберите файл-изображение');
  } else {
    fileInput.setCustomValidity('');
  }
};

var getElementNumber = function (evt) {
  var element = evt.target.tagName.toLowerCase();
  var mapPinsCollection = Array.from(mapPinsField.children);
  if (element === 'button') {
    return mapPinsCollection.indexOf(evt.target, 2);
  } else if (element === 'img' || element === 'svg') {
    return mapPinsCollection.indexOf(evt.target.closest('button'), 2);
  } else {
    return null;
  }
};

var onPopupEscPress = function (evt) {
  if (evt.key === window.constants.CANCEL_EVT_KEY) {
    evt.preventDefault();
    closePopup();
  }
};

var getCard = function (evt) {
  if (map.querySelector('.popup')) {
    map.querySelector('.popup').remove();
  }
  var elementNumber = getElementNumber(evt);
  if (elementNumber > 1) {
    openPopup(elementNumber);
  }
};

var openPopup = function (index) {
  map.insertBefore(window.card.create(database[index - 2]), mapFilter);
  document.addEventListener('keydown', onPopupEscPress);

  var cardClose = document.querySelector('.popup__close');

  cardClose.addEventListener('click', function () {
    closePopup();
  });

  cardClose.addEventListener('keydown', function (evt) {
    if (evt.key === window.constants.CONFIRM_EVT_KEY) {
      closePopup();
    }
  });
};

var closePopup = function () {
  document.removeEventListener('keydown', onPopupEscPress);

  var cardClose = document.querySelector('.popup__close');

  cardClose.removeEventListener('click', function () {
    closePopup();
  });

  cardClose.removeEventListener('keydown', function (evt) {
    if (evt.key === window.constants.CONFIRM_EVT_KEY) {
      closePopup();
    }
  });

  map.querySelector('.popup').remove();
};

var database = window.data();

setInactiveMod();

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    setActiveMod();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === window.constants.CONFIRM_EVT_KEY) {
    setActiveMod();
  }
});
