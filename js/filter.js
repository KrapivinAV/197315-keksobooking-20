'use strict';

window.filter = (function () {
  var map = document.querySelector('.map');
  var mapFilterForm = map.querySelector('.map__filters');
  var mapFilterFields = Array.from(mapFilterForm.children);
  var featuresSet = mapFilterFields[4].querySelectorAll('.map__checkbox');

  var currentOfferSet = [];

  var compareTypeParameter = function (dataItem) {
    if (mapFilterFields[0].value === 'any' || mapFilterFields[0].value === dataItem.offer.type) {
      comparePriceParameter(dataItem);
    }
  };

  var comparePriceParameter = function (dataItem) {
    switch (mapFilterFields[1].value) {
      case 'low':
        if (dataItem.offer.price < window.constants.FILTER_PRICES.middleDown) {
          compareRoomsParameter(dataItem);
        }
        break;
      case 'middle':
        if (dataItem.offer.price >= window.constants.FILTER_PRICES.middleDown && dataItem.offer.price < window.constants.FILTER_PRICES.middleUp) {
          compareRoomsParameter(dataItem);
        }
        break;
      case 'high':
        if (dataItem.offer.price >= window.constants.FILTER_PRICES.middleUp) {
          compareRoomsParameter(dataItem);
        }
        break;
      default:
        compareRoomsParameter(dataItem);
    }
  };

  var compareRoomsParameter = function (dataItem) {
    if (mapFilterFields[2].value === 'any' || parseInt(mapFilterFields[2].value, 10) === dataItem.offer.rooms) {
      compareCapacityParameter(dataItem);
    }
  };

  var compareCapacityParameter = function (dataItem) {
    if (mapFilterFields[3].value === 'any' || parseInt(mapFilterFields[3].value, 10) === dataItem.offer.guests) {
      compareFeaturesParameter(dataItem);
    }
  };

  var compareFeaturesParameter = function (dataItem) {
    var counter = 0;
    for (var i = 0; i < featuresSet.length; i++) {
      var trigger = 0;
      if (featuresSet[i].checked) {
        if (dataItem.offer.features.includes(featuresSet[i].value)) {
          trigger = 1;
        }
      } else {
        trigger = 1;
      }
      if (trigger === 0) {
        break;
      } else {
        counter += trigger;
      }
    }
    if (counter === featuresSet.length) {
      currentOfferSet.push(dataItem);
    }
  };

  return {
    activate: function () {
      mapFilterFields.forEach(function (item) {
        item.removeAttribute('disabled');
      });
    },

    deactivate: function () {
      mapFilterFields.forEach(function (item) {
        item.setAttribute('disabled', 'disabled');
      });
    },

    getCurrentOfferSet: function (data) {
      currentOfferSet = [];
      for (var i = 0; i < data.length; i++) {
        compareTypeParameter(data[i]);
        if (currentOfferSet.length === 5) {
          break;
        }
      }
      return currentOfferSet;
    }
  };
})();
