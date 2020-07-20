'use strict';

window.main = (function () {

  var setActiveModification = function () {
    window.map.activate();
    window.form.activate();
  };

  var setInactiveModification = function () {
    window.map.deactivate();
    window.form.deactivate();
    window.filter.deactivate();
  };

  setInactiveModification();

  return {
    setActiveMode: function () {
      setActiveModification();
    },

    setInactiveMode: function () {
      setInactiveModification();
    }
  };
})();
