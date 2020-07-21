'use strict';

window.constants = (function () {

  return {
    MapPinMainParameter: {
      COORDINATE_Y_MIN: 130,
      COORDINATE_Y_MAX: 630,
      BASIS_TOP: 375,
      BASIS_LEFT: 570,
      ARROW_HEIGHT: 22,
      COLLECTION_POSITION: 0
    },

    PinParameter: {
      WIDTH: 50,
      HEIGHT: 70,
      FIRST_AVAILABLE_INDEX: 2
    },

    translatedTypes: {
      palace: 'Дворец',
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало'
    },

    TypesMinPrice: {
      PALACE: 10000,
      FLAT: 1000,
      HOUSE: 5000,
      BUNGALO: 0
    },

    FilterPrice: {
      MIDDLE_DOWN: 10000,
      MIDDLE_UP: 50000
    },

    FilterField: {
      TYPE: 0,
      PRICE: 1,
      ROOMS: 2,
      CAPACITY: 3,
      FEATURES: 4
    },

    features: [
      'wifi',
      'dishwasher',
      'parking',
      'washer',
      'elevator',
      'conditioner'
    ],

    EvtKey: {
      CONFIRM: 'Enter',
      CANCEL: 'Escape'
    },

    MIMESubStringParameter: {
      BEGIN: 0,
      LENGTH: 5
    },

    URL: {
      LOAD: 'https://javascript.pages.academy/keksobooking/data',
      UPLOAD: 'https://javascript.pages.academy/keksobooking'
    },

    StatusCode: {
      OK: 200
    },

    TIMEOUT_IN_MS: 10000,
    PRIMARY_BUTTON_DOWN: 0,
    DEBOUNCE_INTERVAL: 500,
    PREVIEW_CONTEINER_WIDTH: 70,
    PREVIEW_CONTEINER_HEIGHT: 70
  };
})();
