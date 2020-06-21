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

var map = document.querySelector('.map');
var mapPinsField = document.querySelector('.map__pins');
var mapFilter = document.querySelector('.map__filters-container');
var pinTemplate = document.querySelector('#pin').content;
var pinButton = pinTemplate.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content;
var cardPopup = cardTemplate.querySelector('.popup');
var pinFragment = document.createDocumentFragment();
var cardFragment = document.createDocumentFragment();
var mapPinsFieldWidth = mapPinsField.clientWidth;

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

var addCard = function (newCard) {
  cardFragment.appendChild(newCard);
};

var database = getMassiveDatabase();

for (var i = 0; i < database.length; i++) {
  var mapPin = createPin(database[i]);
  var offerCard = createCard(database[i]);
  addPin(mapPin);
  addCard(offerCard);
}

mapPinsField.appendChild(pinFragment);
map.insertBefore(cardFragment, mapFilter);

map.classList.remove('map--faded');
