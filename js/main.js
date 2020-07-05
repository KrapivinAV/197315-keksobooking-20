'use strict';

var QUANTITY_OF_OFFERS = 8;
var PIN_COORDINATE_X_MIN = 0;
var PIN_COORDINATE_Y_MIN = 130;
var PIN_COORDINATE_Y_MAX = 630;
var PRICE_MIN = 0;
var PRICE_MAX = 100000;
var CHECK_IN_OUT_TIME_MIN = 12;
var CHECK_IN_OUT_TIME_MAX = 14;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var TRASLATED_TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var TYPES_MIN_PRICES = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalo: 0
};

var ROOMS_VARIANTS = [
  1,
  2,
  3,
  100
];
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var CONFIRM_EVT_KEY = 'Enter';
var CANCEL_EVT_KEY = 'Escape';

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
var pinTemplate = document.querySelector('#pin').content;
var pinButton = pinTemplate.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content;
var cardPopup = cardTemplate.querySelector('.popup');
var pinFragment = document.createDocumentFragment();
var mapPinsFieldWidth = mapPinsField.clientWidth;
var mapPinMainWidth = mapPinMain.offsetWidth;
var mapPinMainHeight = mapPinMain.offsetHeight;
var MAP_PIN_MAIN_ARROW_HEIGHT = 22;

var getRandomIntegerValue = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getGuestsQuantity = function (roomsQuantity) {
  return roomsQuantity !== ROOMS_VARIANTS[ROOMS_VARIANTS.length - 1] ? getRandomIntegerValue(1, roomsQuantity) : 'Не для гостей';
};

var getSet = function (basisMassive) {
  var resultSet = [];
  for (var i = 0; i < getRandomIntegerValue(1, basisMassive.length); i++) {
    var setChallenger = basisMassive[getRandomIntegerValue(0, basisMassive.length - 1)];
    if (i !== 0) {
      var trigger = 0;
      for (var j = 0; j < i; j++) {
        if (setChallenger === resultSet[j]) {
          trigger++;
        }
      }
      if (trigger === 0) {
        resultSet[i] = setChallenger;
      } else {
        i--;
      }
    } else {
      resultSet[i] = setChallenger;
    }
  }
  return resultSet;
};

var getMassiveDatabase = function () {
  var massiveDatabase = [];
  for (var i = 0; i < QUANTITY_OF_OFFERS; i++) {
    var roomsSet = ROOMS_VARIANTS[getRandomIntegerValue(0, ROOMS_VARIANTS.length - 1)];
    var xTemp = getRandomIntegerValue(PIN_COORDINATE_X_MIN, mapPinsFieldWidth);
    var yTemp = getRandomIntegerValue(PIN_COORDINATE_Y_MIN, PIN_COORDINATE_Y_MAX);
    var ad = {

      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },

      location: {
        x: xTemp,
        y: yTemp
      },

      offer: {
        title: 'Заголовок предложения от Товарища №' + (i + 1),
        address: '(' + xTemp + ',' + yTemp + ')',
        price: getRandomIntegerValue(PRICE_MIN, PRICE_MAX),
        type: TYPES[getRandomIntegerValue(0, TYPES.length - 1)],
        rooms: roomsSet,
        guests: getGuestsQuantity(roomsSet),
        checkin: getRandomIntegerValue(CHECK_IN_OUT_TIME_MIN, CHECK_IN_OUT_TIME_MAX) + ':00',
        checkout: getRandomIntegerValue(CHECK_IN_OUT_TIME_MIN, CHECK_IN_OUT_TIME_MAX) + ':00',
        features: getSet(FEATURES),
        description: 'Описание предложения от Товарища №' + (i + 1),
        photos: getSet(PHOTOS)
      }
    };
    massiveDatabase.push(ad);
  }
  return massiveDatabase;
};

var createPin = function (data) {
  var pin = pinButton.cloneNode(true);
  var pinImage = pin.querySelector('img');
  pin.style = 'left: ' + (data.location.x - PIN_WIDTH / 2) + 'px; top: ' + (data.location.y - PIN_HEIGHT) + 'px;';
  pinImage.src = data.author.avatar;
  pinImage.alt = data.offer.title;
  return pin;
};

var addPin = function (newPin) {
  pinFragment.appendChild(newPin);
};

var setActiveMod = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  for (var i = 0; i < mapFilterFields.length; i++) {
    mapFilterFields[i].removeAttribute('disabled');
  }

  for (i = 0; i < adFormFields.length; i++) {
    adFormFields[i].removeAttribute('disabled');
  }

  mapPinsField.appendChild(pinFragment);

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
    if (evt.key === CONFIRM_EVT_KEY) {
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
    (mapPinMain.offsetLeft + Math.floor(mapPinMainWidth / 2)) + ',' + (mapPinMain.offsetTop + mapPinMainHeight + MAP_PIN_MAIN_ARROW_HEIGHT);
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
  adFormPriceField.setAttribute('placeholder', TYPES_MIN_PRICES[evt.target.value]);
  adFormPriceField.setAttribute('min', TYPES_MIN_PRICES[evt.target.value]);
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

var createCard = function (data) {
  var card = cardPopup.cloneNode(true);
  var cardAvatar = card.querySelector('.popup__avatar');
  var cardTitle = card.querySelector('.popup__title');
  var cardAddress = card.querySelector('.popup__text--address');
  var cardPrice = card.querySelector('.popup__text--price');
  var cardType = card.querySelector('.popup__type');
  var cardCapacity = card.querySelector('.popup__text--capacity');
  var cardTime = card.querySelector('.popup__text--time');
  var cardFeatures = card.querySelector('.popup__features');
  var cardFeaturesItems = cardFeatures.children;
  var cardDescription = card.querySelector('.popup__description');
  var cardPhotos = card.querySelector('.popup__photos');
  var cardPhoto = cardPhotos.querySelector('.popup__photo');

  cardAvatar.src = data.author.avatar;
  cardTitle.textContent = data.offer.title;
  cardAddress.textContent = data.offer.address;
  cardPrice.innerHTML = data.offer.price + '&#x20bd;<span>/ночь</span>';
  cardType.textContent = TRASLATED_TYPES[data.offer.type];
  cardCapacity.textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
  cardTime.textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;

  for (var i = FEATURES.length - 1; i >= 0; i--) {
    if (data.offer.features.includes(FEATURES[i])) {
      cardFeaturesItems[i].textContent = FEATURES[i];
    } else {
      cardFeatures.removeChild(cardFeaturesItems[i]);
    }
  }

  cardDescription.textContent = data.offer.description;

  for (i = 0; i < data.offer.photos.length; i++) {
    cardPhoto.src = data.offer.photos[i];
    if (i !== (data.offer.photos.length - 1)) {
      cardPhotos.appendChild(cardPhoto.cloneNode());
    }
  }

  return card;
};

var onPopupEscPress = function (evt) {
  if (evt.key === CANCEL_EVT_KEY) {
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
  map.insertBefore(createCard(database[index - 2]), mapFilter);
  document.addEventListener('keydown', onPopupEscPress);

  var cardClose = document.querySelector('.popup__close');

  cardClose.addEventListener('click', function () {
    closePopup();
  });

  cardClose.addEventListener('keydown', function (evt) {
    if (evt.key === CONFIRM_EVT_KEY) {
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
    if (evt.key === CONFIRM_EVT_KEY) {
      closePopup();
    }
  });

  map.querySelector('.popup').remove();
};

var database = getMassiveDatabase();

for (var i = 0; i < database.length; i++) {
  var mapPin = createPin(database[i]);
  addPin(mapPin);
}

setInactiveMod();

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    setActiveMod();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === CONFIRM_EVT_KEY) {
    setActiveMod();
  }
});
