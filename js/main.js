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

var map = document.querySelector('.map');
var mapPinsField = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content;
var pinButton = pinTemplate.querySelector('.map__pin');
var fragment = document.createDocumentFragment();

var types = ['palace', 'flat', 'house', 'bungalo'];
var rooms = [1, 2, 3, 100];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var mapPinsFieldWidth = mapPinsField.clientWidth;

var getRandomIntegerValue = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getGuestsQuantity = function (roomsQuantity) {
  return roomsQuantity !== rooms[rooms.length - 1] ? getRandomIntegerValue(1, roomsQuantity) : 'Не для гостей';
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
    var ad = {}

    ad.author = {};
    ad.author.avatar = 'img/avatars/user0' + (i + 1) + '.png';

    ad.location = {};
    ad.location.x = getRandomIntegerValue(PIN_COORDINATE_X_MIN, mapPinsFieldWidth);
    ad.location.y = getRandomIntegerValue(PIN_COORDINATE_Y_MIN, PIN_COORDINATE_Y_MAX);

    ad.offer = {};
    ad.offer.title = 'Заголовок предложения от Товарища №' + (i + 1);
    ad.offer.address = '(' + ad.location.x + ',' + ad.location.y + ')';
    ad.offer.price = getRandomIntegerValue(PRICE_MIN, PRICE_MAX);
    ad.offer.type = types[getRandomIntegerValue(0, types.length - 1)];
    ad.offer.rooms = rooms[getRandomIntegerValue(0, rooms.length - 1)];
    ad.offer.guests = getGuestsQuantity(ad.offer.rooms);
    ad.offer.checkin = getRandomIntegerValue(CHECK_IN_OUT_TIME_MIN, CHECK_IN_OUT_TIME_MAX); + ':00';
    ad.offer.checkout = getRandomIntegerValue(CHECK_IN_OUT_TIME_MIN, CHECK_IN_OUT_TIME_MAX); + ':00';
    ad.offer.features = getSet(features);
    ad.offer.description = 'Описание предложения от Товарища №' + (i + 1);
    ad.offer.photos = getSet(photos);

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
  fragment.appendChild(newPin);
};

var database = getMassiveDatabase();

for (var i = 0; i < database.length; i++) {
  var mapPin = createPin(database[i]);
  addPin(mapPin);
}

mapPinsField.appendChild(fragment);

map.classList.remove('map--faded');
