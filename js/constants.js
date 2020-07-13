'use strict';

window.constants = (function () {

  return {
    QUANTITY_OF_OFFERS: 8,
    PIN_COORDINATE_X_MIN: 0,
    PIN_COORDINATE_Y_MIN: 130,
    PIN_COORDINATE_Y_MAX: 630,
    PRICE_MIN: 0,
    PRICE_MAX: 100000,
    CHECK_IN_OUT_TIME_MIN: 12,
    CHECK_IN_OUT_TIME_MAX: 14,
    PIN_WIDTH: 50,
    PIN_HEIGHT: 70,
    MAP_PIN_MAIN_ARROW_HEIGHT: 22,
    TYPES: [
      'palace',
      'flat',
      'house',
      'bungalo'
    ],
    TRASLATED_TYPES: {
      palace: 'Дворец',
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало'
    },
    TYPES_MIN_PRICES: {
      palace: 10000,
      flat: 1000,
      house: 5000,
      bungalo: 0
    },
    ROOMS_VARIANTS: [
      1,
      2,
      3,
      100
    ],
    FEATURES: [
      'wifi',
      'dishwasher',
      'parking',
      'washer',
      'elevator',
      'conditioner'
    ],
    PHOTOS: [
      'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
    ],
    CONFIRM_EVT_KEY: 'Enter',
    CANCEL_EVT_KEY: 'Escape',
  }
})();
