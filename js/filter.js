'use strict';

window.filter = (function () {
  var map = document.querySelector('.map');
  var mapFilter = map.querySelector('.map__filters-container');
  var mapFilterFields = Array.from(mapFilter.children);

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
    }
  };
})();
