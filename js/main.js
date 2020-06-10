'use strict';

var QUANTITY_OF_OFFERS = 8;
var PIN_COORDINATE_X_MIN = 0;
var PIN_COORDINATE_Y_MIN = 130;
var PIN_COORDINATE_Y_MAX = 630;
var PRICE_MIN = 0;
var PRICE_MAX = 100000;
var CHECKIN_TIME_MIN = 12;
var CHECKIN_TIME_MAX = 14;

var map = document.querySelector('.map');
var mapPinsField = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content;
var pinButton = pinTemplate.querySelector('.map__pin');
var pinImage = pinButton.querySelector('img');

var types = ['palace', 'flat', 'house', 'bungalo'];
var rooms = [1, 2, 3, 100];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getRandomIntegerValue = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var getGuestsQuantity = function (roomsQuantity) {
  return roomsQuantity !== rooms[rooms.length - 1] ? getRandomIntegerValue(1, roomsQuantity) : 'Не для гостей';
}

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
}

var getMassiveDatabase = function () {
  var massiveDatabase = [];
  for (var i = 0; i < QUANTITY_OF_OFFERS; i++) {
    var checkInOut = getRandomIntegerValue(CHECKIN_TIME_MIN, CHECKIN_TIME_MAX);

    massiveDatabase[i] = {};

    massiveDatabase[i].author = {};
    massiveDatabase[i].author.avatar = 'img/avatars/user0' + (i + 1) + '.png';

    massiveDatabase[i].location = {};
    massiveDatabase[i].location.x = getRandomIntegerValue(PIN_COORDINATE_X_MIN, mapPinsField.clientWidth);
    massiveDatabase[i].location.y = getRandomIntegerValue(PIN_COORDINATE_Y_MIN, PIN_COORDINATE_Y_MAX);

    massiveDatabase[i].offer = {};
    massiveDatabase[i].offer.title = 'Заголовок предложения от Товарища №' + (i + 1);
    massiveDatabase[i].offer.address = '(' + massiveDatabase[i].location.x + ',' + massiveDatabase[i].location.y + ')';
    massiveDatabase[i].offer.price = getRandomIntegerValue(PRICE_MIN, PRICE_MAX);
    massiveDatabase[i].offer.type = types[getRandomIntegerValue(0, types.length - 1)];
    massiveDatabase[i].offer.rooms = rooms[getRandomIntegerValue(0, rooms.length - 1)];
    massiveDatabase[i].offer.guests = getGuestsQuantity(massiveDatabase[i].offer.rooms);
    massiveDatabase[i].offer.checkin = 'C ' + checkInOut + ':00';
    massiveDatabase[i].offer.checkout = 'До ' + checkInOut + ':00';
    massiveDatabase[i].offer.features = getSet(features);
    massiveDatabase[i].offer.description = 'Описание предложения от Товарища №' + (i + 1);
    massiveDatabase[i].offer.photos = getSet(photos);
  }
  return massiveDatabase;
}

var createPin = function (data) {
  var pin = pinButton.cloneNode(true);
  pin.style = 'left: ' + (data.location.x - 25) + 'px; top: ' + (data.location.y - 70) + 'px;';
  pinImage.src = data.author.avatar;
  pinImage.alt = data.offer.title;
  return pin;
}

var addPin = function (newPin) {
  mapPinsField.appendChild(newPin);
}

var database = getMassiveDatabase();
console.log(database);

map.classList.remove('map--faded');

for (var i = 0; i < database.length; i++) {
  var mapPin = createPin(database[i]);
  addPin(mapPin);
}
